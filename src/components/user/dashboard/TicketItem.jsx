// ============================================================
// TicketItem.jsx
// A single row in the recent tickets list.
//
// Props:
//   id          - ticket ID (used for navigation)
//   title       - ticket title
//   date        - submission date string
//   status      - "open" | "pending" | "closed"
//   submittedBy - who submitted (defaults to "You")
// ============================================================

import { useNavigate } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

// Status config: dot color + badge styles
const statusConfig = {
  open: {
    dot: "bg-error",
    badge: "bg-primary-container text-primary border border-primary",
    label: "Open",
  },
  pending: {
    dot: "bg-tertiary-container",
    badge: "bg-surface-variant text-tertiary border border-tertiary-container",
    label: "Pending",
  },
  closed: {
    dot: "bg-outline-variant",
    badge:
      "bg-surface-variant text-on-surface-variant border border-outline-variant",
    label: "Closed",
  },
};

export default function TicketItem({
  id,
  title = "Untitled Ticket",
  date = "",
  status = "open",
  submittedBy = "You",
}) {
  const navigate = useNavigate();
  const config = statusConfig[status] || statusConfig.open;

  return (
    <div
      onClick={() => navigate(`/user/tickets/${id}`)}
      className="px-lg py-md hover:bg-surface-container-low transition-colors
        cursor-pointer group flex items-center justify-between"
    >
      {/* Left: dot + text */}
      <div className="flex items-start gap-md">
        {/* Status dot */}
        <div
          className={`mt-1 h-2 w-2 rounded-full shrink-0 ${config.dot}`}
        />

        <div>
          <h4
            className="font-body-md text-body-md font-semibold text-on-surface
            group-hover:text-primary transition-colors"
          >
            {title}
          </h4>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Submitted by {submittedBy} • {date}
          </p>
        </div>
      </div>

      {/* Right: badge + chevron */}
      <div className="flex items-center gap-md">
        <span
          className={`px-3 py-1 rounded-full font-label-md text-label-md ${config.badge}`}
        >
          {config.label}
        </span>
        <MdChevronRight
          size={20}
          className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
}
