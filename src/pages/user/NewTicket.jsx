// ============================================================
// NewTicket.jsx  (User)
// Page that assembles the new ticket form inside a card.
// ============================================================

import NewTicketHeader from "../../components/user/newTicket/NewTicketHeader";
import NewTicketForm from "../../components/user/newTicket/NewTicketForm";

export default function NewTicket() {
  return (
    // Centered card layout
    <div className="flex items-center justify-center">
      <div
        className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl
        shadow-sm border border-outline-variant p-xl flex flex-col gap-xl"
      >
        <NewTicketHeader />
        <NewTicketForm />
      </div>
    </div>
  );
}
