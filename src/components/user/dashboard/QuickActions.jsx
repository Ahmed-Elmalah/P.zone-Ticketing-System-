// ============================================================
// QuickActions.jsx
// Card with quick action buttons for the user dashboard.
// ============================================================

import { useNavigate } from "react-router-dom";
import { MdEditNote } from "react-icons/md";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant
      p-lg flex flex-col gap-md"
    >
      <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
        Quick Actions
      </h3>

      {/* New Ticket button */}
      <button
        onClick={() => navigate("/user/tickets/new")}
        className="w-full bg-primary text-on-primary py-sm px-md rounded-lg
          font-button-text text-button-text hover:bg-on-primary-fixed-variant
          transition-colors flex items-center justify-center gap-sm shadow-sm"
      >
        <MdEditNote size={18} />
        New Ticket
      </button>
    </div>
  );
}
