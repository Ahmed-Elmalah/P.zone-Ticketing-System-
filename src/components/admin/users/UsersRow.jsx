import React from "react";
import { useNavigate } from "react-router-dom";

export default function UsersRow({ user }) {
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : "U";
  };

  const avatarUrl = user.avatar?.url ? (import.meta.env.PROD ? user.avatar.url : `http://localhost:1337${user.avatar.url}`) : null;
  const roleName = user.role?.name || "None";
  const isBlocked = user.blocked;

  return (
    <tr 
      onClick={() => navigate(`/admin/users/${user.id}`)}
      className="transition-colors duration-150 group hover:bg-surface-container-low cursor-pointer"
    >
      
      {/* ── User Details (Avatar + Name + Email) ── */}
      <td className="py-md px-md">
        <div className="flex items-center gap-sm">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={user.username} 
              className="w-9 h-9 rounded-full border border-outline-variant object-cover" 
            />
          ) : (
            <div className={`w-9 h-9 text-white rounded-full flex items-center justify-center font-bold text-sm bg-primary-container `}>
              {getInitials(user.username || user.email)}
            </div>
          )}
          <div>
            <div className="font-body-md font-bold text-on-surface">{user.username || "Unknown"}</div>
            <div className="font-label-md text-label-md text-on-surface-variant">{user.email}</div>
          </div>
        </div>
      </td>
      
      {/* ── Role Badge ── */}
      <td className="py-md px-md">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-label-md shadow-sm bg-surface-container-high border border-outline-variant text-on-surface">
          {roleName}
        </span>
      </td>
      
      {/* ── Status Indicator ── */}
      <td className="py-md px-md">
        <div className="flex items-center gap-xs">
          <div className={`w-2 h-2 rounded-full ${isBlocked ? 'bg-error' : 'bg-secondary'}`}></div>
          <span className="font-body-md text-body-md text-on-surface">
            {isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      </td>

    </tr>
  );
}