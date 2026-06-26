import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";

export default function TicketsRow({ ticket }) {
  const navigate = useNavigate();

  // Navigate to ticket details page, removing the '#' symbol
  const handleRowClick = () => {
    const cleanId = ticket.id.replace("#", "");
    navigate(`/admin/tickets/${cleanId}`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className={`${ticket.rowStyle} transition-colors group cursor-pointer`}
    >
      {/* Checkbox (Stop propagation to prevent row click) */}
      <td className="p-md" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          className="rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
        />
      </td>

      {/* Ticket ID */}
      <td className="p-md font-button-text text-button-text text-on-surface">
        {ticket.id}
      </td>

      {/* Requester Info */}
      <td className="p-md">
        <div className="flex items-center gap-sm">
          <span className="font-body-md text-on-surface">
            {ticket.requester}
          </span>
          <span className="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full">
            {ticket.department}
          </span>
        </div>
      </td>

      {/* Subject */}
      <td className="p-md font-body-md text-on-surface truncate max-w-75">
        {ticket.subject}
      </td>

      {/* Assignee */}
      <td className="p-md">
        {ticket.assigneeName ? (
          <div className="flex items-center gap-sm">
            <div
              className={`w-6 h-6 rounded-full ${ticket.assigneeColor} flex items-center justify-center text-xs font-bold`}
            >
              {ticket.assigneeInitials}
            </div>
            <span className="font-body-md text-on-surface">
              {ticket.assigneeName}
            </span>
          </div>
        ) : (
          <span className="text-on-surface-variant text-sm italic">
            Unassigned
          </span>
        )}
      </td>

      {/* Status Badge */}
      <td className="p-md">
        <span
          className={`${ticket.statusStyle} font-label-md px-2.5 py-1 rounded-md border inline-flex items-center gap-1`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${ticket.statusDot}`}
          ></span>
          {ticket.status}
        </span>
      </td>

      {/* Date */}
      <td className="p-md font-body-md text-on-surface-variant">
        {ticket.date}
      </td>

      {/* Actions (Stop propagation to prevent row click) */}
      <td
        className="p-md text-right relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="text-on-surface-variant hover:text-primary p-1 rounded-md hover:bg-surface-container-high transition-colors">
          <MdMoreVert size={20} />
        </button>
      </td>
    </tr>
  );
}
