import React from "react";
import NewTicketHeader from "../../components/help/newTicket/NewTicketHeader";
import HelpNewTicketForm from "../../components/help/newTicket/HelpNewTicketForm";

export default function HelpNewTicket() {
  return (
    // Main Content Canvas wrapping layout rules
    <main className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-12 min-h-[calc(100vh-70px)] flex justify-center items-start">
      {/* Form Container Card Structure */}
      <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant overflow-hidden">
        {/* 1. Header Section */}
        <NewTicketHeader />

        {/* 2. Unified Form */}
        <HelpNewTicketForm />
      </div>
    </main>
  );
}
