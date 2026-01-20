import { io, Socket } from 'socket.io-client';

// Ngrok URL - works on both desktop and phone
const SOCKET_URL = 'https://explicative-providencia-transfusable.ngrok-free.dev';

class SocketService {
  private socket: Socket | null = null;

  connect(): Socket {
    if (!this.socket) {
      console.log('🔌 Connecting to:', SOCKET_URL);
      
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        console.log('✅ Connected to server:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Disconnected from server');
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Connection error:', error);
        console.log('📡 Attempted URL:', SOCKET_URL);
      });
    }
    return this.socket;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();