import { io } from 'socket.io-client';

const isProd = import.meta.env.PROD;

// If we are in production (Vercel), we MUST connect to the same origin to route through vercel.json rewrites.
// Otherwise, we connect to the VITE_API_URL backend.
const SOCKET_URL = isProd ? window.location.origin : (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:1337');

let socket = null;

export const initSocket = () => {
  if (socket) return socket;

  const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');

  socket = io(SOCKET_URL, {
    auth: { token },
    // Force polling first to prevent Vercel from immediately killing ws:// upgrades
    transports: isProd ? ['polling'] : ['polling', 'websocket'],
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
