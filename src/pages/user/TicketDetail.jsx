import React from "react";
import { MdAssignmentInd } from "react-icons/md";

import TicketDetailHeader from "../../components/user/ticketDetails/TicketDetailHeader";
import MessageBubble from "../../components/user/ticketDetails/MessageBubble";
import SystemNote from "../../components/user/ticketDetails/SystemNote";
import ReplyBox from "../../components/user/ticketDetails/ReplyBox";

export default function TicketDetail() {
  const handleSendReply = (replyText) => {
    console.log("Reply sent:", replyText);
  };

  return (
    // التغيير السحري هنا:
    // fixed inset-0 z-50: هتخلي الصفحة تطفو فوق أي حاجة وتملى الشاشة بالكامل وتلغي السكرول الخارجي
    <main className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* الـ Header: دلوقتي هياخد عرض الشاشة بالكامل */}
      <header className="flex-none w-full bg-surface-container-lowest border-b border-outline-variant">
        <div className="w-full mx-auto">
          <TicketDetailHeader
            title="Cannot access dashboard"
            ticketRef="Tck-1024"
            status="open"
            createdAt="2 hours ago"
            channel="Email"
          />
        </div>
      </header>

      {/* منطقة الشات */}
      <div className="flex-1 overflow-y-auto bg-surface-bright">
        <div className="max-w-4xl mx-auto p-margin-desktop space-y-xl">
          <MessageBubble
            type="customer"
            senderName="Sarah Jenkins"
            time="Today, 09:41 AM"
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAsIaYvNT5QAZBzUZnz7eaqKEoX9CTf5Jx9YinplZU3DswgS8FnMtE_SdRweq5PNAZksLwXGUbR5tN44Xljq_8hhVax5dcfr0UNWk8YtcCq4N3CV6BLOXbQJuX5shpykt8mP6azT-7d9SGhd0esT4kUcd6l9j2Pew6Xv6DNJzV4T02v2fYMaGFBYGZuOPlRkXDGnKX7QBNQvfYMYDse8DLrr6RNkKeibxLrstiexlYz5TJbgPW_SpUK4yeDwdQ1Hr_pqY5Y-7pnnlY"
            lines={[
              "Hi Support Team,",
              'I\'ve been trying to log into the main analytics dashboard since this morning but I keep getting an "Error 503 - Service Unavailable" message.',
            ]}
            attachments={["screenshot_error.png"]}
          />

          <SystemNote
            text="Ticket assigned to David Chen (Tier 2 Support)"
            icon={MdAssignmentInd}
          />

          <MessageBubble
            type="agent"
            senderName="David Chen"
            time="Today, 10:05 AM"
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBNNY1-Q_fNTUT4YlYYzcZQYOxr5EsaNU9KXwpUNJUxVFnNPnZlBkpbr4m8LoXXaIIzAm08j6hStdIquYISmhiGDWZ9jVYs28GJvdLX1ARfjbT5WTkWM-rgHrvcmlYxDoSVDt80b0Zrq0pZww9_6z4KJUPAy_oFGhoEhIErtF4rnzxZPMCjvhfeAvDMFQ6iYnh1nZOEcK1DuG5uE_DrO_5xiSlw_1cFPFEe-nyF_M6LizFoGlEL4KVXypzD9vTITDHrISKpPS7QbLc"
            lines={[
              "Hi Sarah,",
              "We are currently experiencing a partial degradation of service on our analytics cluster.",
              "Our engineering team is actively investigating.",
            ]}
          />
        </div>
      </div>

      {/* الـ ReplyBox */}
      <footer className="flex-none">
        <ReplyBox onSend={handleSendReply} />
      </footer>
    </main>
  );
}
