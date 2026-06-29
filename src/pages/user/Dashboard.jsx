// ============================================================
// Dashboard.jsx  (User)
// Assembles all dashboard components into the final page.
// Data is static for now — replace with API calls later.
// ============================================================

import React, { useEffect } from "react";
import WelcomeHeader from "../../components/user/dashboard/WelcomeHeader";
import SummaryCard from "../../components/user/dashboard/SummaryCard";
import RecentTickets from "../../components/user/dashboard/RecentTickets";
import QuickActions from "../../components/user/dashboard/QuickActions";
import HelpfulLinks from "../../components/user/dashboard/HelpfulLinks";
import { MdInbox, MdTaskAlt } from "react-icons/md";
// Import store
import useTicketStore from "../../store/useTicketStore";

// ── Page ─────────────────────────────────────────────────────
export default function Dashboard() {
  const { tickets, fetchTickets, isLoading } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Calculate dynamic stats
  const openTickets = tickets.filter((t) => t.status?.toLowerCase() !== "closed" && t.status?.toLowerCase() !== "resolved").length;
  const resolvedTickets = tickets.filter((t) => t.status?.toLowerCase() === "resolved" || t.status?.toLowerCase() === "closed").length;

  const summaryStats = [
    {
      label: "My Open Tickets",
      count: openTickets,
      icon: MdInbox,
      accentColor: "primary",
      trend: "Based on current data",
      trendUp: false,
    },
    {
      label: "My Resolved Tickets",
      count: resolvedTickets,
      icon: MdTaskAlt,
      accentColor: "secondary",
      trend: "Based on current data",
      trendUp: true,
    },
  ];

  // Map to format RecentTickets expects
  const recentTickets = tickets.slice(0, 4).map((t) => ({
    id: t.documentId || t.id,
    title: t.subject,
    date: new Date(t.createdAt).toLocaleDateString(),
    status: t.status?.toLowerCase() || 'open',
  }));


  return (
    <main className="max-w-360 mx-auto flex flex-col gap-xl">
      {/* Welcome greeting */}
      <WelcomeHeader />

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left column — 8 cols */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            {summaryStats.map((stat) => (
              <SummaryCard key={stat.label} {...stat} />
            ))}
          </div>
          <RecentTickets tickets={recentTickets} />
        </div>

        {/* Right column — 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <QuickActions />
          <HelpfulLinks />
        </div>
      </div>
    </main>
  );
}
