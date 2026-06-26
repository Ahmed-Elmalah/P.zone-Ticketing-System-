import React from "react";
import DashboardHeader from "../../components/help/dashboard/DashboardHeader";
import KpiCards from "../../components/help/dashboard/KpiCards";
import TicketQueue from "../../components/help/dashboard/TicketQueue";

export default function HelpDashboard() {
  return (
    // Assuming the TopNav is handled by your Layout component,
    // we just wrap the main content here.
    <main className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      {/* 1. Page Header */}
      <DashboardHeader />

      {/* 2. Key Performance Indicators (KPIs) */}
      <KpiCards />

      {/* 3. Main Ticket Queue Container */}
      <TicketQueue />
    </main>
  );
}
