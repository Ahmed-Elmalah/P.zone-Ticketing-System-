import React from "react";
import NewTicketHeader from "../../components/help/newTicket/NewTicketHeader";
import RequesterSearch from "../../components/help/newTicket/RequesterSearch";
import TicketDetailsForm from "../../components/help/newTicket/TicketDetailsForm";

export default function HelpNewTicket() {
  return (
    // Main Content Canvas wrapping layout rules
    <main className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-12 min-h-[calc(100vh-70px)] flex justify-center items-start">
      {/* Form Container Card Structure */}
      <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant overflow-hidden">
        {/* 1. Header Section */}
        <NewTicketHeader />

        {/* 2. Form Body Wrapper containing the internal components */}
        <div className="p-xl pb-0">
          {/* Core Field: Requester Lookup separated safely */}
          <RequesterSearch />
        </div>

        {/* 3. Detailed Data Input Elements & Actions Bar */}
        <TicketDetailsForm />
      </div>
    </main>
  );
}
