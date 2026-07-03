import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getSocket } from '../../api/socket';
import { useAuthStore } from '../../auth/authStore';
import useNotificationStore from '../../store/useNotificationStore';

const handledMessages = new Set();

export default function GlobalSocketListener() {
  const { user } = useAuthStore();
  const { addLiveNotification } = useNotificationStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    if (!socket) return;

    // Join personal and global rooms based on user ID and role
    const documentId = user.documentId || user.id?.toString();
    const roleType = user.role?.type || (user.role && user.role.name ? user.role.name.toLowerCase() : 'authenticated');

    const handleConnect = () => {
      if (documentId) {
        socket.emit("setup_global_rooms", {
          documentId: documentId,
          role: roleType
        });
      }
    };

    if (socket.connected) {
      handleConnect();
    }
    socket.on("connect", handleConnect);

    const handleNotification = (message) => {
      
      const msgId = message.documentId || message.id;
      if (handledMessages.has(msgId)) {
        return;
      }
      handledMessages.add(msgId);
      
      const senderId = message.sender?.documentId || message.sender?.id?.toString();
      
      if (senderId === documentId) {
        return;
      }

      // Add to Bell Notifications Dropdown via Zustand
      addLiveNotification(message, documentId);

      const ticketId = message.ticket?.documentId || message.ticket?.id?.toString();
      if (!ticketId) {
        return;
      }

      const currentPath = location.pathname;
      const isInsideTicket = currentPath.includes(`/tickets/${ticketId}`);
      

      if (isInsideTicket) {
        return;
      }


      const handleToastClick = (t) => {
        toast.dismiss(t.id);
        if (roleType === 'admin') navigate(`/admin/tickets/${ticketId}`);
        else if (roleType === 'help') navigate(`/help/tickets/${ticketId}`);
        else navigate(`/user/tickets/${ticketId}`);
      };

      const avatarUrl = message.sender?.avatar?.url;
      const fullAvatarUrl = avatarUrl ? (avatarUrl.startsWith('http') ? avatarUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${avatarUrl}`) : null;
      const initial = message.sender?.username?.[0]?.toUpperCase() || 'U';

      toast.custom((t) => (
        <div
          onClick={() => handleToastClick(t)}
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } w-87.5 bg-surface shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black/5 cursor-pointer hover:bg-surface-container transition-all p-4`}
        >
          <div className="flex items-start w-full gap-4 min-w-0">
            <div className="shrink-0">
              {fullAvatarUrl ? (
                <img
                  className="h-10 w-10 rounded-full object-cover shadow-sm border border-outline-variant"
                  src={fullAvatarUrl}
                  alt={message.sender?.username}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold shadow-sm border border-primary/20">
                  {initial}
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <p className="text-sm font-semibold text-on-surface truncate">
                {message.sender?.username || 'Unknown User'}
              </p>
              <p className="mt-1 text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                {message.content}
              </p>
              <p className="mt-2 text-xs font-bold text-primary tracking-wide">
                View Ticket #{ticketId.substring(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      ), { duration: 5000 });
    };

    socket.on("global_notification", handleNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("global_notification", handleNotification);
    };
  }, [user, location.pathname, navigate]);

  return null; // This component doesn't render anything visually
}
