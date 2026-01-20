export type User = {
  id: string;
  username: string;
  online: boolean;
  lastSeen: number;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: number;
  read: boolean;
};

export type RootStackParamList = {
  Login: undefined;
  ChatList: { userId: string; username: string };
  Chat: { currentUserId: string; otherUser: User };
};