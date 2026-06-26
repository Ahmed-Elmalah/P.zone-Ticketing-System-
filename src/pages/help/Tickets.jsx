import React from "react";
import TicketsHeader from "../../components/help/tickets/TicketsHeader";
import TicketsFilterBar from "../../components/help/tickets/TicketsFilterBar";
import TicketsTable from "../../components/help/tickets/TicketsTable";

export default function Tickets() {
  return (
    // Main content layout structure container matching desktop rules
    <main className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-2xl flex flex-col gap-xl">
      {/* 1. View Header Info */}
      <TicketsHeader />

      {/* 2. Filters & Search Box */}
      <TicketsFilterBar />

      {/* 3. Main Modern Data Grid Table Component */}
      <TicketsTable />
    </main>
  );
}
