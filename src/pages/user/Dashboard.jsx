// ============================================================
// Dashboard.jsx  (User)
// Assembles all dashboard components into the final page.
// Data is static for now — replace with API calls later.
// ============================================================

import WelcomeHeader from "../../components/user/dashboard/WelcomeHeader";
import SummaryCard from "../../components/user/dashboard/SummaryCard";
import RecentTickets from "../../components/user/dashboard/RecentTickets";
import QuickActions from "../../components/user/dashboard/QuickActions";
import HelpfulLinks from "../../components/user/dashboard/HelpfulLinks";
import { MdInbox, MdTaskAlt } from "react-icons/md";

// ── Static data (replace with useFetch / API call later) ────
const summaryStats = [
  {
    label: "My Open Tickets",
    count: 3,
    icon: MdInbox,
    accentColor: "primary",
    trend: "+3 since yesterday",
    trendUp: false,
  },
  {
    label: "My Resolved Tickets",
    count: 15,
    icon: MdTaskAlt,
    accentColor: "secondary",
    trend: "+12 this week",
    trendUp: true,
  },
];

const recentTickets = [
  {
    id: 1,
    title: "Cannot access internal dashboard",
    date: "Oct 24, 2023",
    status: "open",
  },
  {
    id: 2,
    title: "Billing issue with latest invoice",
    date: "Oct 23, 2023",
    status: "pending",
  },
  {
    id: 3,
    title: "Update user permissions for marketing team",
    date: "Oct 22, 2023",
    status: "closed",
  },
  {
    id: 4,
    title: "API Rate limit exceeded on production",
    date: "Oct 22, 2023",
    status: "open",
  },
];

// ── Page ─────────────────────────────────────────────────────
export default function Dashboard() {
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
