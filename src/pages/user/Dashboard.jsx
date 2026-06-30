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
import SystemAlert from "../../components/user/dashboard/SystemAlert";
import { MdInbox, MdTaskAlt } from "react-icons/md";
// Import store
import useTicketStore from "../../store/useTicketStore";
import useAdminStore from "../../store/useAdminStore";

import { useAuthStore } from "../../auth/authStore";

// ── Page ─────────────────────────────────────────────────────
export default function Dashboard() {
  const { tickets, fetchTickets, isLoading } = useTicketStore();
  const { fetchSettings, announcement, quickActions } = useAdminStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      fetchTickets({ 
        sort: 'createdAt:desc',
        filters: { creator: { id: { $eq: user.id } } }
      });
    }
    fetchSettings();
  }, [fetchTickets, fetchSettings, user?.id]);

  // Calculate dynamic stats — field is 'state' in Strapi (not 'status')
  const openTickets = tickets.filter((t) => t.state !== "Closed" && t.state !== "Resolved").length;
  const resolvedTickets = tickets.filter((t) => t.state === "Resolved" || t.state === "Closed").length;

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
    status: t.state || 'Open', // field is 'state' in Strapi
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
          <SystemAlert announcement={announcement} />
          <QuickActions quickActions={quickActions} />
        </div>
      </div>
    </main>
  );
}
