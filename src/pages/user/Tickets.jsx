import React from "react";
// Import your components
import TicketHeader from "../../components/user/Tickets/TicketHeader";
import TicketControls from "../../components/user/Tickets/TicketControls";
import TicketItem from "../../components/user/dashboard/TicketItem";
import Pagination from "../../components/user/Tickets/Pagination";

const Tickets = () => {
  // Dummy data array
  const ticketsData = [
    {
      id: "TCK-1024",
      subject: "Login issues after recent update",
      category: "Technical",
      date: "Oct 24, 2023",
      status: "Open",
    },
    {
      id: "TCK-1023",
      subject: "Request for invoice copy",
      category: "Billing",
      date: "Oct 23, 2023",
      status: "Closed",
    },
    {
      id: "TCK-1022",
      subject: "How to export reports?",
      category: "General",
      date: "Oct 22, 2023",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col">

      <main className="flex-1 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl">
        {/* Extracted Header & Controls */}
        <TicketHeader />
        <TicketControls />

        {/* Ticket List Section */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
          {/* List Header */}
          <div className="hidden md:grid grid-cols-12 gap-md px-lg py-md border-b border-outline-variant bg-surface-dim font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            <div className="col-span-2">Ticket ID</div>
            <div className="col-span-4">Subject</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Submitted</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* List Rows */}
          <div className="flex flex-col">
            {ticketsData.map((ticket, index) => (
              <TicketItem
                key={index}
                id={ticket.id}
                subject={ticket.subject}
                category={ticket.category}
                date={ticket.date}
                status={ticket.status}
              />
            ))}
          </div>

          {/* Extracted Pagination */}
          <Pagination />
        </section>
      </main>
    </div>
  );
};

export default Tickets;
