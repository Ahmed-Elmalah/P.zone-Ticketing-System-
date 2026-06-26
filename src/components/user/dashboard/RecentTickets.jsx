// ============================================================
// RecentTickets.jsx
// Container for the recent tickets list.
// Shows header with "View All" button + list of TicketItems.
//
// Props:
//   tickets - array of ticket objects
// ============================================================

import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import TicketItem from "./TicketItem";

export default function RecentTickets({ tickets = [] }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant
      flex flex-col overflow-hidden"
    >
      {/* ── Header ── */}
      <div
        className="px-lg py-md border-b border-outline-variant flex justify-between
        items-center bg-surface-bright"
      >
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Recent Tickets
        </h3>
        <button
          onClick={() => navigate("/user/tickets")}
          className="font-button-text text-button-text text-primary hover:text-surface-tint
            transition-colors flex items-center gap-xs"
        >
          View All
          <MdArrowForward size={16} />
        </button>
      </div>

      {/* ── Ticket list ── */}
      <div className="flex flex-col divide-y divide-outline-variant">
        {tickets.length > 0 ? (
          tickets.map((ticket) => <TicketItem key={ticket.id} {...ticket} />)
        ) : (
          // Empty state
          <div className="px-lg py-xl text-center text-on-surface-variant font-body-md text-body-md">
            No tickets yet. Create your first ticket!
          </div>
        )}
      </div>
    </div>
  );
}
