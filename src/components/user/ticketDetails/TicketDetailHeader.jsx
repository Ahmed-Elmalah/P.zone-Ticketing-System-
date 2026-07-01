// ============================================================
// TicketDetailHeader.jsx
// Sticky header for the ticket detail page.
// Shows back button, ticket title, status badge, and meta info.
//
// Props:
//   title      - ticket title
//   ticketRef  - ticket reference (e.g. "#Tck-1024")
//   status     - "open" | "in_progress" | "resolved" | "closed"
//   createdAt  - human-readable date string
//   channel    - submission channel (e.g. "Email")
// ============================================================

import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdNotifications } from "react-icons/md";

// Badge styles per status
const statusBadge = {
  open: "bg-secondary-container text-on-secondary-container border-secondary",
  in_progress: "bg-primary-container text-on-primary-container border-primary",
  resolved: "bg-surface-variant text-on-surface-variant border-outline",
  closed: "bg-surface-variant text-on-surface-variant border-outline",
};

const statusLabel = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export default function TicketDetailHeader({
  title = "Ticket Details",
  ticketRef = "#Tck-0000",
  status = "open",
  createdAt = "",
  channel = "Web",
}) {
  const navigate = useNavigate();

  return (
    <header
      className="w-full sticky top-0 z-10
      px-margin-desktop py-md flex justify-between items-center"
    >
      {/* ── Left: back button + ticket info ── */}
      <div className="flex items-center gap-md">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface-variant hover:text-primary transition-colors
            p-sm rounded-full hover:bg-surface-container-high"
        >
          <MdArrowBack size={22} />
        </button>

        {/* Title + status + meta */}
        <div>
          <div className="flex items-center gap-sm">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              {title}
            </h1>

            {/* Status badge */}
            <span
              className={`font-label-md text-label-md px-2 py-0.5 rounded-full border
              ${statusBadge[status] || statusBadge.open}`}
            >
              {statusLabel[status] || status}
            </span>
          </div>

          {/* Ticket ref + created date + channel */}
          <div className="font-body-md text-body-md text-on-surface-variant mt-1 flex items-center gap-sm">
            <span>{ticketRef}</span>
            <span>•</span>
            <span>
              Created {createdAt} via {channel}
            </span>
          </div>
        </div>
      </div>


    </header>
  );
}
