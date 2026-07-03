import { io } from 'socket.io-client';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';
// The socket server is at the root of the backend URL (without /api)
const SOCKET_URL = apiBaseUrl.replace(/\/api\/?$/, '');

let socket = null;

export const initSocket = () => {
  // Socket.io plugin is now installed on the backend


  if (socket) return socket;

  const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
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
