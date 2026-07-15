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

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminTicketHeader from "../../components/admin/ticketDetails/TicketDetailHeader";
import ConversationPanel from "../../components/admin/ticketDetails/ConversationPanel";
import PropertiesPanel from "../../components/admin/ticketDetails/PropertiesPanel";
import AuditTrail from "../../components/admin/ticketDetails/AuditTrail";

import useTicketStore from "../../store/useTicketStore";
import useChatStore from "../../store/useChatStore";
import { useAuthStore } from "../../auth/authStore";
import useAdminStore from "../../store/useAdminStore";
import { getSocket } from "../../api/socket";

// Static audit events since Strapi doesn't track this by default
const AUDIT_EVENTS = [
  {
    time: "Just now",
    isActive: true,
    description: (
      <>
        Ticket accessed by <strong className="text-primary">Admin</strong>
      </>
    ),
  }
];

export default function TicketDetail() {
  const { id } = useParams();
  const { selectedTicket, fetchTicketById, updateTicket, clearSelectedTicket } = useTicketStore();
  const { messages, fetchMessages, sendMessage, clearMessages, receiveRealTimeMessage } = useChatStore();
  const { user } = useAuthStore();
  const { users, fetchUsers } = useAdminStore();

  useEffect(() => {
    if (id) {
      fetchTicketById(id);
      fetchMessages(id);
      fetchUsers();

      const socket = getSocket();
      if (socket) {
        socket.emit("join_ticket", id);
        socket.on("new_message", (newMessage) => {
          receiveRealTimeMessage(newMessage);
        });
      }
    }
    return () => {
      const socket = getSocket();
      if (socket && id) {
        socket.emit("leave_ticket", id);
        socket.off("new_message");
      }
      clearMessages();
      clearSelectedTicket();
    };
  }, [id, fetchTicketById, fetchMessages, clearMessages, clearSelectedTicket, fetchUsers, receiveRealTimeMessage]);

  const handleSend = async (text, activeTab, files) => {
    if (!text.trim() && (!files || files.length === 0)) return;
    try {
      await sendMessage({
        content: text,
        ticket: id,
        sender: user?.id,
        isInternalNote: activeTab === "internal",
      }, files);
    } catch (err) {
      console.error("Failed to send reply", err);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await updateTicket(selectedTicket.documentId || selectedTicket.id, { state: newStatus });
      await fetchTicketById(id);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleUpdateAssignee = async (newAssigneeId) => {
    try {
      const payload = newAssigneeId === "unassigned" ? { assignee: null } : { assignee: newAssigneeId };
      await updateTicket(selectedTicket.documentId || selectedTicket.id, payload);
      await fetchTicketById(id);
    } catch (err) {
      console.error("Failed to update assignee", err);
    }
  };

  if (!selectedTicket) {
    return (
      <div className="flex h-screen items-center justify-center text-on-surface-variant">
        Loading ticket details...
      </div>
    );
  }

  // Format Messages for ConversationPanel
  const initialMessage = {
    type: "customer",
    senderName: selectedTicket.creator?.username || "Unknown",
    time: new Date(selectedTicket.createdAt).toLocaleString(),
    avatar: selectedTicket.creator?.avatar?.url,
    lines: [selectedTicket.description],
    attachments: selectedTicket.attachments || [],
  };

  const formattedMessages = [
    initialMessage,
    ...messages.map(msg => {
      const senderRole = msg.sender?.role?.type;
      
      // An agent is anyone who is an admin, help, sent an internal note, or is the current logged-in user
      const isAgent = msg.isInternalNote || 
                      senderRole === 'admin' || 
                      senderRole === 'help' || 
                      msg.sender?.id === user?.id || 
                      msg.sender?.documentId === user?.id ||
                      msg.sender?.id === user?.documentId;
      
      let type = "customer";
      if (msg.isInternalNote) {
        type = "internal";
      } else if (isAgent) {
        type = "staff";
      }
      
      // Strip manual "[INTERNAL NOTE]" prefix if it was added manually in older messages
      const rawContent = msg.content || "";
      const cleanContent = rawContent.replace(/^\[INTERNAL NOTE\]\s*/i, "");

      return {
        type: type,
        senderName: msg.sender?.username || user?.username || 'System',
        time: new Date(msg.createdAt).toLocaleString(),
        avatar: msg.sender?.avatar?.url,
        lines: [cleanContent],
        attachments: msg.attachments || [],
      };
    })
  ];

  const requesterData = {
    Name: selectedTicket.creator?.fullName || selectedTicket.creator?.username || "N/A",
    Email: selectedTicket.creator?.email || "N/A",
    Phone: selectedTicket.creator?.phoneNumber || "N/A",
    Device: selectedTicket.creator?.deviceNumber || selectedTicket.creator?.laptopNumber || "N/A",
  };

  // Filter users to only agents for the assignee dropdown
  const agentsOnly = users.filter(
    (u) =>
      u.role?.type === "help" ||
      u.role?.type === "admin" ||
      u.role?.name?.toLowerCase().includes("help"),
  );

  return (
    <div className="flex flex-col min-h-full pb-xl">
      <AdminTicketHeader
        ticketRef={`#${(selectedTicket.documentId || selectedTicket.id).substring(0, 8).toUpperCase()}`}
        title={selectedTicket.subject}
        priority={selectedTicket.priority}
      />

      <div className="flex-1 p-margin-desktop flex flex-col lg:flex-row gap-lg">
        <ConversationPanel messages={formattedMessages} onSend={handleSend} />
        
        <div className="flex flex-col gap-lg w-full lg:w-87.5 shrink-0">
          <PropertiesPanel
            status={selectedTicket.state || "Open"}
            onStatusChange={handleUpdateStatus}
            assignee={selectedTicket.assignee ? { id: selectedTicket.assignee.documentId || selectedTicket.assignee.id, name: selectedTicket.assignee.username, avatar: selectedTicket.assignee.avatar?.url } : { id: "", name: "Unassigned", avatar: "" }}
            onAssigneeChange={handleUpdateAssignee}
            agents={agentsOnly}
            priority={selectedTicket.priority}
            category={selectedTicket.category?.name || "General"}
            requester={requesterData}
          />
          <AuditTrail events={AUDIT_EVENTS} />
        </div>
      </div>
    </div>
  );
}
