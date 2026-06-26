import React from "react";
import { MdAssignmentInd } from "react-icons/md";

// Reused Components from User side (Make sure paths are correct based on your folder structure)
import TicketDetailHeader from "../../components/user/ticketDetails/TicketDetailHeader";
import MessageBubble from "../../components/user/ticketDetails/MessageBubble";
import SystemNote from "../../components/user/ticketDetails/SystemNote";

// New Components for Help side
import TicketSidebar from "../../components/help/ticketDetails/TicketSidebar";
import HelpReplyBox from "../../components/help/ticketDetails/HelpReplyBox";

export default function HelpTicketDetail() {
  const handleSendReply = (text, type) => {
    console.log(`Sending ${type}:`, text);
  };

  return (
    // Fixed wrapper to take over the screen and hide parent scrolls
    <main className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* 1. Header (Reused) */}
      <div className="flex-none">
        <TicketDetailHeader
          title="Cannot access billing portal"
          ticketRef="#TCK-8492"
          status="open"
          createdAt="by Alex Johnson - Finance"
          channel="Web"
        />
      </div>

      {/* 2. Two Column Layout */}
      <div className="flex-1 flex overflow-hidden w-full">
        {/* Left Column: Conversation Feed */}
        <div className="flex-7 flex flex-col h-full border-r border-outline-variant bg-surface-bright relative">
          {/* Scrollable messages area */}
          <div className="flex-1 overflow-y-auto p-margin-desktop space-y-xl">
            {/* Customer Message (Reused) */}
            <MessageBubble
              type="customer"
              senderName="Alex Johnson"
              time="Today, 09:41 AM"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAsIaYvNT5QAZBzUZnz7eaqKEoX9CTf5Jx9YinplZU3DswgS8FnMtE_SdRweq5PNAZksLwXGUbR5tN44Xljq_8hhVax5dcfr0UNWk8YtcCq4N3CV6BLOXbQJuX5shpykt8mP6azT-7d9SGhd0esT4kUcd6l9j2Pew6Xv6DNJzV4T02v2fYMaGFBYGZuOPlRkXDGnKX7QBNQvfYMYDse8DLrr6RNkKeibxLrstiexlYz5TJbgPW_SpUK4yeDwdQ1Hr_pqY5Y-7pnnlY"
              lines={[
                "Hi Support Team,",
                'I\'ve been trying to log into the billing portal since this morning but I keep getting an "Error 503 - Service Unavailable" message.',
                "Is there a known outage right now? I need to pull reports for a meeting at noon.",
              ]}
              attachments={["screenshot_error.png"]}
            />

            {/* System Note (Reused) */}
            <SystemNote
              text="Ticket assigned to David Chen (Tier 2 Support)"
              icon={MdAssignmentInd}
            />

            {/* Agent Reply (Reused) */}
            <MessageBubble
              type="agent"
              senderName="David Chen"
              time="Today, 10:05 AM"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBNNY1-Q_fNTUT4YlYYzcZQYOxr5EsaNU9KXwpUNJUxVFnNPnZlBkpbr4m8LoXXaIIzAm08j6hStdIquYISmhiGDWZ9jVYs28GJvdLX1ARfjbT5WTkWM-rgHrvcmlYxDoSVDt80b0Zrq0pZww9_6z4KJUPAy_oFGhoEhIErtF4rnzxZPMCjvhfeAvDMFQ6iYnh1nZOEcK1DuG5uE_DrO_5xiSlw_1cFPFEe-nyF_M6LizFoGlEL4KVXypzD9vTITDHrISKpPS7QbLc"
              lines={[
                "Hi Alex,",
                "We are currently experiencing a partial degradation of service on our billing cluster that is causing intermittent 503 errors.",
                "Our engineering team is actively investigating. I will keep you updated.",
              ]}
            />
          </div>

          {/* Help Desk Reply Box with Tabs */}
          <HelpReplyBox onSend={handleSendReply} />
        </div>

        {/* Right Column: Ticket Properties Sidebar */}
        <TicketSidebar />
      </div>
    </main>
  );
}
