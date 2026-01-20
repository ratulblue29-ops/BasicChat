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

export type ChatRoom = {
  participants: string[];
  lastMessage?: Message;
  updatedAt: number;
};