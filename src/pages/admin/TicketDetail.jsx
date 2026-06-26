// ============================================================
// TicketDetail.jsx  (Admin)
// Assembles the 3-column admin ticket detail page.
//
// Layout structure:
//   ┌─ AdminTicketHeader (auto height, sticky) ──────────────┐
//   ├─ 3-col section (flex-1 min-h-0, fills remaining) ──────┤
//   │  ├─ ConversationPanel (50%)                            │
//   │  ├─ PropertiesPanel   (25%)                            │
//   │  └─ AuditTrail        (25%)                            │
//   └────────────────────────────────────────────────────────┘
//
// The outer div uses h-screen so the 3-col section can fill
// the remaining space and each panel scrolls independently.
// ============================================================

import AdminTicketHeader from "../../components/admin/ticketDetails/TicketDetailHeader";
import ConversationPanel from "../../components/admin/ticketDetails/ConversationPanel";
import PropertiesPanel from "../../components/admin/ticketDetails/PropertiesPanel";
import AuditTrail from "../../components/admin/ticketDetails/AuditTrail";

// ── Static data (replace with useFetch / Strapi API later) ──

const MESSAGES = [
  {
    type: "system",
    senderName: "System Auto-Reply",
    time: "Just now",
    lines: ["Ticket status changed to In Progress. SLA clock has started."],
  },
  {
    type: "customer",
    senderName: "Sarah Jenkins",
    time: "10 mins ago",
    lines: [
      "Hello, the European servers are still showing offline on our dashboard. We cannot sync our inventory databases. Please advise on ETA.",
    ],
    attachments: ["error_log_EU.txt"],
  },
  {
    type: "staff",
    senderName: "Admin User",
    time: "25 mins ago",
    lines: [
      "Hi Sarah, we are aware of the regional outage affecting EU-West-2. Our infrastructure team is currently rebooting the cluster. I will keep you updated here.",
    ],
  },
];

const REQUESTER = {
  Department: "IT Operations",
  Location: "EU-West-2",
  Device: "MacBook Pro 16",
};

const AUDIT_EVENTS = [
  {
    time: "Oct 24, 10:45 AM",
    isActive: true,
    description: (
      <>
        Status changed to <strong>In Progress</strong> by{" "}
        <span className="text-primary cursor-pointer hover:underline">
          System
        </span>
      </>
    ),
  },
  {
    time: "Oct 24, 10:30 AM",
    isActive: false,
    description: (
      <>
        Priority escalated to <strong className="text-error">High</strong> by{" "}
        <span className="text-primary cursor-pointer hover:underline">
          Admin User
        </span>
      </>
    ),
  },
  {
    time: "Oct 24, 10:25 AM",
    isActive: false,
    description: (
      <>
        Ticket assigned to{" "}
        <span className="text-primary cursor-pointer hover:underline">
          Admin User
        </span>
      </>
    ),
  },
  {
    time: "Oct 24, 10:00 AM",
    isActive: false,
    description: (
      <>
        Ticket created via <strong>Support Portal</strong>
      </>
    ),
  },
];

// ── Page ─────────────────────────────────────────────────────
export default function TicketDetail() {
  const handleSend = (text, isInternal) => {
    // TODO: replace with Strapi API call
    console.log("Reply:", { text, isInternal });
  };

  return (
    // h-screen gives a fixed total height so the 3-col section
    // can use flex-1 to fill whatever space is left below the header
    <div className="flex flex-col h-screen">
      {/* Sticky ticket header — auto height */}
      <AdminTicketHeader
        ticketRef="#INC-2023-8942"
        title="Database Sync Failure in EU Region"
        priority="high"
      />

      {/* 3-column section — fills remaining height
          min-h-0 is required so flex children can shrink + scroll */}
      <div className="flex-1 min-h-0 p-margin-desktop flex flex-col lg:flex-row gap-lg overflow-hidden">
        <ConversationPanel messages={MESSAGES} onSend={handleSend} />
        <PropertiesPanel
          status="in_progress"
          assignee={{ name: "Admin User", avatar: "" }}
          priority="high"
          category="Infrastructure"
          requester={REQUESTER}
          sla={{ remaining: "1h 12m", percentUsed: 80 }}
        />
        <AuditTrail events={AUDIT_EVENTS} />
      </div>
    </div>
  );
}
