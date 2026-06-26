import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";

export default function TicketsTableRow({ ticket }) {
  const navigate = useNavigate();

  // Navigate to ticket details, removing the '#' from the URL
  const handleRowClick = () => {
    const cleanId = ticket.id.replace("#", "");
    navigate(`/help/tickets/${cleanId}`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className="hover:bg-surface-container-low transition-colors group cursor-pointer relative"
    >
      {/* Visual Priority Line */}
      <td className="w-1 p-0 relative">
        <div
          className={`absolute inset-y-0 left-0 w-1 ${ticket.sideIndicator}`}
        ></div>
      </td>

      <td className="p-md font-body-md text-body-md text-on-surface-variant whitespace-nowrap">
        {ticket.id}
      </td>

      <td className="p-md">
        <span className="font-headline-md text-body-lg text-on-background group-hover:text-primary transition-colors font-semibold">
          {ticket.subject}
        </span>
      </td>

      <td className="p-md font-body-md text-body-md text-on-background font-semibold whitespace-nowrap">
        {ticket.requester}
      </td>

      <td className="p-md whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${ticket.statusBadge}`}
        >
          {ticket.status}
        </span>
      </td>

      <td className="p-md whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${ticket.priorityBadge}`}
        >
          {ticket.priority}
        </span>
      </td>

      <td className="p-md font-body-md text-[13px] text-on-surface-variant text-right whitespace-nowrap">
        {ticket.lastUpdated}
      </td>

      <td className="p-md text-right">
        {/* Prevent row click when clicking the options button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <MdMoreVert size={20} />
        </button>
      </td>
    </tr>
  );
}
