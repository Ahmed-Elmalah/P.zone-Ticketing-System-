import React from "react";
import { useNavigate } from "react-router-dom";

// Priority badge config
const PRIORITY_CONFIG = {
  Low: {
    className: "bg-surface-container text-on-surface-variant border-outline-variant/50",
    dot: "bg-outline",
  },
  Medium: {
    className: "bg-secondary-container text-on-secondary-container border-secondary/20",
    dot: "bg-secondary",
  },
  High: {
    className: "bg-error-container text-on-error-container border-error/20",
    dot: "bg-error",
  },
  Critical: { 
    className: "bg-error text-on-error border-error",
    dot: "bg-surface",
  },
};

export default function TicketsRow({ ticket }) {
  const navigate = useNavigate();

  // Navigate to ticket details page using documentId
  const handleRowClick = () => {
    navigate(`/admin/tickets/${ticket.documentId || ticket.id}`);
  };

  const status = ticket.state || "Open";
  const priorityCfg = PRIORITY_CONFIG[ticket.priority] || PRIORITY_CONFIG.Medium;

  return (
    <tr
      onClick={handleRowClick}
      className="bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer"
    >
      {/* Ticket ID */}
      <td className="p-md font-button-text text-button-text text-on-surface">
        #{((ticket.documentId || ticket.id) + "").substring(0, 8).toUpperCase()}
      </td>

      {/* Requester Info */}
      <td className="p-md">
        <div className="flex flex-col">
          <span className="font-body-md text-on-surface">
            {ticket.creator?.username || "Unknown"}
          </span>
          {ticket.creator?.department && (
            <span className="text-on-surface-variant text-[10px] font-bold uppercase">
              {ticket.creator.department}
            </span>
          )}
        </div>
      </td>

      {/* Subject */}
      <td className="p-md font-body-md text-on-surface truncate max-w-75">
        {ticket.subject}
      </td>

      {/* Assignee */}
      <td className="p-md">
        {ticket.assignee ? (
          <div className="flex items-center gap-sm">
            <div
              className={`w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold`}
            >
              {ticket.assignee.username[0]?.toUpperCase()}
            </div>
            <span className="font-body-md text-on-surface">
              {ticket.assignee.username}
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
          className={`bg-surface-container-low text-on-surface-variant border border-outline-variant/50 font-label-md px-2.5 py-1 rounded-md inline-flex items-center gap-1`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${status === 'Open' ? 'bg-primary' : status === 'Resolved' ? 'bg-secondary' : 'bg-outline'}`}
          ></span>
          {status}
        </span>
      </td>

      {/* Date */}
      <td className="p-md font-body-md text-on-surface-variant">
        {new Date(ticket.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </td>

      {/* Priority */}
      <td className="p-md text-right relative">
        <span
          className={`${priorityCfg.className} font-label-md px-2.5 py-1 rounded-md border inline-flex items-center gap-1`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priorityCfg.dot}`}></span>
          {ticket.priority || "Medium"}
        </span>
      </td>
    </tr>
  );
}
