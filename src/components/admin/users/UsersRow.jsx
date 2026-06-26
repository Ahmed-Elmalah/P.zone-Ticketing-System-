import React from "react";
import { MdMoreVert } from "react-icons/md";

export default function UsersRow({ user }) {
  return (
    <tr className="hover:bg-surface-container-low transition-colors duration-150 group">
      
      {/* ── User Details (Avatar + Name + Email) ── */}
      <td className="py-md px-md">
        <div className="flex items-center gap-sm">
          {/* Render image if avatar exists, else render initials */}
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-9 h-9 rounded-full border border-outline-variant object-cover" 
            />
          ) : (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${user.avatarColor}`}>
              {user.initials}
            </div>
          )}
          <div>
            <div className="font-body-md font-bold text-on-surface">{user.name}</div>
            <div className="font-label-md text-label-md text-on-surface-variant">{user.email}</div>
          </div>
        </div>
      </td>
      
      {/* ── Role Badge ── */}
      <td className="py-md px-md">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-label-md shadow-sm ${user.roleStyle}`}>
          {user.role}
        </span>
      </td>
      
      {/* ── Status Indicator ── */}
      <td className="py-md px-md">
        <div className="flex items-center gap-xs">
          <div className={`w-2 h-2 rounded-full ${user.statusDot}`}></div>
          <span className="font-body-md text-body-md text-on-surface">{user.status}</span>
        </div>
      </td>
      
      {/* ── Department ── */}
      <td className="py-md px-md font-body-md text-body-md text-on-surface-variant">
        {user.department}
      </td>
      
      {/* ── Last Active ── */}
      <td className="py-md px-md font-body-md text-body-md text-on-surface-variant">
        {user.lastActive}
      </td>
      
      {/* ── Actions ── */}
      <td className="py-md px-md text-right">
        <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
          <MdMoreVert size={20} />
        </button>
      </td>

    </tr>
  );
}