import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAssignmentInd, MdMoreVert } from "react-icons/md";

// Helper for mapping status (state) to styles
const getStatusStyles = (status) => {
  switch (status) {
    case "Open":
      return "bg-surface-variant text-on-surface-variant";
    case "InProgress":
      return "bg-primary-fixed text-on-primary-fixed";
    case "Pending":
      return "bg-tertiary-fixed text-on-tertiary-fixed";
    case "Resolved":
      return "bg-secondary-fixed text-on-secondary-fixed";
    case "Closed":
      return "bg-outline text-surface-container-lowest";
    default:
      return "bg-surface-variant text-on-surface-variant";
  }
};

// Helper for mapping priority to styles
const getPriorityStyles = (priority) => {
  switch (priority) {
    case "Low":
      return { badge: "bg-surface-container-high text-on-surface", side: "bg-outline" };
    case "Medium":
      return { badge: "bg-tertiary-fixed text-on-tertiary-fixed", side: "bg-tertiary" };
    case "High":
      return { badge: "bg-error-container text-on-error-container", side: "bg-error" };
    case "Critical":
      return { badge: "bg-error text-on-error", side: "bg-error" };
    default:
      return { badge: "bg-surface-container-high text-on-surface", side: "bg-outline" };
  }
};

export default function TicketsTableRow({ ticket, showAssignButton, onAssign }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/help/tickets/${ticket.documentId || ticket.id}`);
  };

  const statusBadge = getStatusStyles(ticket.state);
  const { badge: priorityBadge, side: sideIndicator } = getPriorityStyles(ticket.priority);
  
  // Format dates nicely
  const lastUpdated = new Date(ticket.updatedAt || ticket.createdAt).toLocaleDateString();
  const ticketRef = `#${(ticket.documentId || ticket.id).substring(0, 8).toUpperCase()}`;

  return (
    <tr
      onClick={handleRowClick}
      className="hover:bg-surface-container-low transition-colors group cursor-pointer relative"
    >
      {/* Visual Priority Line */}
      <td className="w-1 p-0 relative">
        <div className={`absolute inset-y-0 left-0 w-1 ${sideIndicator}`}></div>
      </td>

      <td className="p-md font-body-md text-body-md text-on-surface-variant whitespace-nowrap">
        {ticketRef}
      </td>

      <td className="p-md">
        <span className="font-headline-md text-body-lg text-on-background group-hover:text-primary transition-colors font-semibold">
          {ticket.subject}
        </span>
      </td>

      <td className="p-md font-body-md text-body-md text-on-background font-semibold whitespace-nowrap">
        {ticket.creator?.username || "Unknown"}
      </td>

      <td className="p-md whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${statusBadge}`}>
          {ticket.state || "Open"}
        </span>
      </td>

      <td className="p-md whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold ${priorityBadge}`}>
          {ticket.priority || "Low"}
        </span>
      </td>

      <td className="p-md font-body-md text-[13px] text-on-surface-variant text-right whitespace-nowrap">
        {lastUpdated}
      </td>

      <td className="p-md text-right whitespace-nowrap">
        {showAssignButton ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAssign(ticket.documentId || ticket.id);
            }}
            className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors px-3 py-1.5 rounded-full text-xs font-bold"
          >
            <MdAssignmentInd size={16} />
            Assign to Me
          </button>
        ) : (
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <MdMoreVert size={20} />
          </button>
        )}
      </td>
    </tr>
  );
}
