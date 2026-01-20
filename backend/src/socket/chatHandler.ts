import { Server, Socket } from 'socket.io';
import { db } from '../config/firebase';
import { User, Message } from '../types';

const onlineUsers = new Map<string, string>();

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('user:login', async (username: string) => {
      try {
        const userId = socket.id;
        onlineUsers.set(userId, username);

        const userRef = db.ref(`users/${userId}`);
        await userRef.set({
          id: userId,
          username,
          online: true,
          lastSeen: Date.now(),
        });

        socket.emit('user:login:success', { userId, username });

        const usersSnapshot = await db.ref('users').once('value');
        const users = usersSnapshot.val();
        io.emit('users:update', users);

        console.log(`${username} logged in with ID: ${userId}`);
      } catch (error) {
        console.error('Login error:', error);
        socket.emit('user:login:error', 'Failed to login');
      }
    });

    socket.on('message:send', async (data: { receiverId: string; message: string }) => {
      try {
        const senderId = socket.id;
        const { receiverId, message } = data;

        const messageData: Message = {
          id: `${Date.now()}_${senderId}`,
          senderId,
          receiverId,
          message,
          timestamp: Date.now(),
          read: false,
        };

        const chatRoomId = [senderId, receiverId].sort().join('_');
        const messageRef = db.ref(`messages/${chatRoomId}`).push();
        await messageRef.set(messageData);

        const chatRoomRef = db.ref(`chatRooms/${chatRoomId}`);
        await chatRoomRef.set({
          participants: [senderId, receiverId],
          lastMessage: messageData,
          updatedAt: Date.now(),
        });

        io.to(receiverId).emit('message:receive', messageData);
        socket.emit('message:sent', messageData);

        console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('message:error', 'Failed to send message');
      }
    });

    socket.on('messages:fetch', async (otherUserId: string) => {
      try {
        const userId = socket.id;
        const chatRoomId = [userId, otherUserId].sort().join('_');

        const messagesSnapshot = await db.ref(`messages/${chatRoomId}`).once('value');
        const messages = messagesSnapshot.val();

        const messagesArray = messages
          ? Object.values(messages).sort((a: any, b: any) => a.timestamp - b.timestamp)
          : [];

        socket.emit('messages:fetched', messagesArray);
      } catch (error) {
        console.error('Fetch messages error:', error);
        socket.emit('messages:error', 'Failed to fetch messages');
      }
    });

    socket.on('typing:start', (receiverId: string) => {
      io.to(receiverId).emit('typing:user', { userId: socket.id, typing: true });
    });

    socket.on('typing:stop', (receiverId: string) => {
      io.to(receiverId).emit('typing:user', { userId: socket.id, typing: false });
    });

    socket.on('disconnect', async () => {
      try {
        const userId = socket.id;
        const username = onlineUsers.get(userId);

        if (username) {
          const userRef = db.ref(`users/${userId}`);
          await userRef.update({
            online: false,
            lastSeen: Date.now(),
          });

          onlineUsers.delete(userId);

          const usersSnapshot = await db.ref('users').once('value');
          const users = usersSnapshot.val();
          io.emit('users:update', users);

          console.log(`${username} disconnected`);
        }
      } catch (error) {
        console.error('Disconnect error:', error);
      }
    });
  });
};