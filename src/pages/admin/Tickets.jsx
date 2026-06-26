import React from "react";
import TicketsFilters from "../../components/admin/tickets/TicketsFilters";
import TicketsGrid from "../../components/admin/tickets/TicketsGrid";
import TopHeader from "../../components/admin/shared/TopHeader";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AdminTickets() {
  const navigate = useNavigate();
  const addNewTicketBtn = (
    <button onClick={()=> navigate('new')} className="bg-primary text-on-primary font-button-text text-button-text p-sm sm:py-sm sm:px-md rounded-lg sm:rounded-lg flex items-center justify-center gap-xs hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]">
      <MdAdd size={20} />
      <span className="hidden sm:inline">New Ticket</span>
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* 1. Reusable Top Header with page-specific button */}
      <TopHeader
        placeholder="Search Ticket ID, Requester, or Subject..."
        actionButton={addNewTicketBtn}
      />
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-360 mx-auto w-full">
        <div className="flex flex-col gap-lg">
          {/* 1. Page Header & Filters */}
          <TicketsFilters />

          {/* 2. Data Grid (Table & Pagination) */}
          <TicketsGrid />
        </div>
      </main>
    </div>
    // Main Content container with max width and spacing
  );
}
