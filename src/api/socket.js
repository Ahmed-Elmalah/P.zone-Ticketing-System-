import { io } from 'socket.io-client';

const isProd = import.meta.env.PROD;

// VITE_SOCKET_URL must be set to a direct HTTPS backend URL in production
// (e.g., a Cloudflare Tunnel URL) because Vercel's serverless proxy
// does NOT support socket.io long-polling or WebSockets.
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
  || (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : null)
  || (isProd ? window.location.origin : 'http://localhost:1337');

let socket = null;

export const initSocket = () => {
  if (socket) return socket;

  const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: isProd ? ['polling'] : ['polling', 'websocket'],
    extraHeaders: {
      'ngrok-skip-browser-warning': 'true',
    },
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
