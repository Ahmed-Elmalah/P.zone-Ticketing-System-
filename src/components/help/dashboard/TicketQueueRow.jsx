import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";

export default function TicketQueueRow({ ticket }) {
  const navigate = useNavigate();

  // Navigate to ticket details
  const handleRowClick = () => {
    const cleanId = ticket.id.replace("#", "");
    navigate(`/help/tickets/${cleanId}`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors group cursor-pointer"
    >
      <td className="py-md px-lg text-on-surface-variant font-medium">
        {ticket.id}
      </td>

      <td className="py-md px-lg">
        <div className="text-on-surface font-medium">{ticket.subject}</div>
        <div className="text-on-surface-variant text-[12px] truncate max-w-md">
          {ticket.desc}
        </div>
      </td>

      <td className="py-md px-lg">
        <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container text-on-surface-variant text-[11px] font-semibold tracking-wide">
          <ticket.Icon size={14} className="mr-1" /> {ticket.category}
        </span>
      </td>

      <td className="py-md px-lg">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${ticket.dotColor}`}></div>
          <span className="text-on-surface">{ticket.priority}</span>
        </div>
      </td>

      <td className="py-md px-lg text-right text-on-surface-variant">
        {ticket.time}
      </td>

      <td className="py-md px-lg text-right">
        {/* Prevent row click when clicking options */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="text-outline hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MdMoreVert size={20} />
        </button>
      </td>
    </tr>
  );
}