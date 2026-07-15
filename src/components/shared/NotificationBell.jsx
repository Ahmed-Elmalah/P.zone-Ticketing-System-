import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdNotifications, MdNotificationsNone, MdCircle, MdClose } from "react-icons/md";
import { useAuthStore } from "../../auth/authStore";
import useNotificationStore from "../../store/useNotificationStore";

export default function NotificationBell({ dropdownPosition = "right-0 mt-2" }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Zustand Store
  const { notifications, initialize, dismissNotification } = useNotificationStore();

  // Determine user role for routing
  const roleType = user?.role?.type || (user?.role && user?.role.name ? user.role.name.toLowerCase() : 'authenticated');

  useEffect(() => {
    if (user) {
      initialize(user.documentId || user.id);
    }
  }, [user, initialize]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif) => {
    setIsOpen(false);
    await dismissNotification(notif);

    // Navigate to Ticket
    const ticketId = notif.ticket?.documentId || notif.ticket?.id;
    if (ticketId) {
      if (roleType === 'admin') navigate(`/admin/tickets/${ticketId}`);
      else if (roleType === 'help') navigate(`/help/tickets/${ticketId}`);
      else navigate(`/user/tickets/${ticketId}`);
    }
  };

  const handleDismiss = async (notif, e) => {
    e.stopPropagation();
    await dismissNotification(notif);
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
        title="Notifications"
      >
        {unreadCount > 0 ? (
          <>
            <MdNotifications size={24} className="text-primary" />
            {/* Badge */}
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-4.5 h-4.5 bg-error text-white text-[10px] font-bold rounded-full border-2 border-surface px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          </>
        ) : (
          <MdNotificationsNone size={24} />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className={`absolute ${dropdownPosition} w-80 max-h-96 overflow-y-auto bg-surface shadow-2xl rounded-xl border border-outline-variant z-50 flex flex-col`}>
          <div className="p-4 border-b border-outline-variant sticky top-0 bg-surface/95 backdrop-blur z-10 flex items-center justify-between">
            <h3 className="font-headline-sm text-on-surface font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-white font-medium bg-primary-container px-2 py-1 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center flex flex-col items-center gap-2 text-on-surface-variant">
                <MdNotificationsNone size={32} className="opacity-50" />
                <p className="font-body-md">No new notifications</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const avatarUrl = notif.sender?.avatar?.url;
                const fullAvatarUrl = avatarUrl ? (avatarUrl.startsWith('http') ? avatarUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${avatarUrl}`) : null;
                const initial = notif.sender?.username?.[0]?.toUpperCase() || 'U';

                return (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className="p-4 border-b border-outline-variant hover:bg-surface-container-high cursor-pointer transition-colors flex items-start gap-3 relative"
                  >
                    <div className="shrink-0">
                      {fullAvatarUrl ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover shadow-sm border border-outline-variant"
                          src={fullAvatarUrl}
                          alt={notif.sender?.username}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold shadow-sm border border-primary/20">
                          {initial}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm font-semibold text-on-surface truncate">
                        {notif.sender?.username || 'System'}
                      </p>
                      <p className="text-sm text-on-surface-variant line-clamp-2">
                        {notif.message}
                      </p>
                      {notif.ticket && (
                        <p className="text-xs font-medium text-primary mt-1">
                          Ticket #{notif.ticket.documentId?.substring(0,8).toUpperCase() || notif.ticket.id}
                        </p>
                      )}
                    </div>
                    {/* Actions and Unread indicator */}
                    <div className="flex flex-col items-center gap-2">
                      <button 
                        onClick={(e) => handleDismiss(notif, e)}
                        className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-error transition-colors"
                        title="Dismiss"
                      >
                        <MdClose size={16} />
                      </button>
                      <MdCircle size={8} className="text-primary mt-1" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
