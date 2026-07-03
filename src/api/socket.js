import { io } from 'socket.io-client';

const isProd = import.meta.env.PROD;
const SOCKET_URL = isProd 
  ? '/' 
  : (import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '') 
      : 'http://localhost:1337');

let socket = null;

export const initSocket = () => {
  // Socket.io plugin is now installed on the backend


  if (socket) return socket;

  const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: isProd ? ['polling'] : ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err.message);
  });

  return socket;
};

export const getSocket = () => {
  return socket || initSocket();
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
