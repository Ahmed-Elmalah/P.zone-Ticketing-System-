import React from "react";
import AdminNewTicketForm from "../../components/admin/newTicket/AdminNewTicketForm";

export default function NewTicket() {
  return (
    <div className="p-margin-desktop max-w-5xl mx-auto w-full">
      <div className="mb-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          Create New Ticket (On Behalf)
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Log a ticket on behalf of another user. This will appear in their dashboard.
        </p>
      </div>
      <AdminNewTicketForm />
    </div>
  );
}
