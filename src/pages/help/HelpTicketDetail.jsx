import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdAssignmentInd } from "react-icons/md";
import { toast } from "react-hot-toast";

import TicketDetailHeader from "../../components/user/ticketDetails/TicketDetailHeader";
import MessageBubble from "../../components/user/ticketDetails/MessageBubble";
import SystemNote from "../../components/user/ticketDetails/SystemNote";
import TicketSidebar from "../../components/help/ticketDetails/TicketSidebar";
import StaffComposer from "../../components/shared/StaffComposer";

import useTicketStore from "../../store/useTicketStore";
import useChatStore from "../../store/useChatStore";
import useHelpStore from "../../store/useHelpStore";
import { useAuthStore } from "../../auth/authStore";

export default function HelpTicketDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { selectedTicket, fetchTicketById, updateTicket, clearSelectedTicket } = useTicketStore();
  const { messages, fetchMessages, sendMessage, clearMessages } = useChatStore();
  const { usersList, loadUsersList, optimisticUpdateTicket } = useHelpStore();

  useEffect(() => {
    if (id) {
      fetchTicketById(id);
      fetchMessages(id);
      loadUsersList();
    }
    return () => {
      clearMessages();
      clearSelectedTicket();
    };
  }, [id, fetchTicketById, fetchMessages, loadUsersList, clearMessages, clearSelectedTicket]);

  const handleSendReply = async (text, type, files) => {
    try {
      await sendMessage({
        content: text,
        ticket: id,
        sender: user?.id,
        isInternalNote: type === "internal",
      }, files);
      await fetchMessages(id);
      toast.success(type === "internal" ? "Internal note added" : "Reply sent");
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  const handleUpdateTicket = async (updateData) => {
    try {
      // Update both stores so UI reflects changes immediately globally
      await updateTicket(id, updateData);
      await optimisticUpdateTicket(id, updateData);
      toast.success("Ticket updated successfully");
    } catch (err) {
      toast.error("Failed to update ticket");
    }
  };

  if (!selectedTicket) {
    return <div className="flex h-screen items-center justify-center text-on-surface-variant">Loading ticket...</div>;
  }

  const ticketRef = `#${(selectedTicket.documentId || selectedTicket.id).substring(0, 8).toUpperCase()}`;

  return (
    <main className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* 1. Header */}
      <div className="flex-none">
        <TicketDetailHeader
          title={selectedTicket.subject}
          ticketRef={ticketRef}
          status={selectedTicket.state || "Open"}
          createdAt={`by ${selectedTicket.creator?.username || "Unknown"}`}
          channel="Web"
        />
      </div>

      {/* 2. Two Column Layout */}
      <div className="flex-1 flex overflow-hidden w-full">
        {/* Left Column: Conversation Feed */}
        <div className="flex-7 flex flex-col h-full border-r border-outline-variant bg-surface-bright relative">
          <div className="flex-1 overflow-y-auto p-margin-desktop space-y-xl">
            
            {/* Initial Request Bubble (Simulated as first message for now) */}
            <MessageBubble
              type="customer"
              senderName={selectedTicket.creator?.username || "Unknown"}
              time={new Date(selectedTicket.createdAt).toLocaleString()}
              avatar={selectedTicket.creator?.avatar?.url}
              lines={[selectedTicket.description]}
              attachments={selectedTicket.attachments || []}
            />

            {/* System Note if assigned */}
            {selectedTicket.assignee && (
              <SystemNote
                text={`Ticket assigned to ${selectedTicket.assignee.username}`}
                icon={MdAssignmentInd}
              />
            )}

            {/* Render Chat Messages */}
            {messages.map((msg) => {
              const senderRole = msg.sender?.role?.type;
              const isAgent = senderRole === 'admin' || senderRole === 'help';
              
              return (
                <MessageBubble
                  key={msg.documentId || msg.id}
                  type={isAgent ? 'agent' : 'customer'}
                  senderName={msg.sender?.username || 'Unknown'}
                  time={new Date(msg.createdAt).toLocaleString()}
                  avatar={msg.sender?.avatar?.url}
                  lines={[msg.content]}
                  attachments={msg.attachments || []}
                  isInternal={msg.isInternalNote}
                  isOwnMessage={msg.sender?.documentId === user?.documentId || msg.sender?.id === user?.id}
                />
              );
            })}
          </div>

          {/* Help Desk Reply Box */}
          <StaffComposer onSend={handleSendReply} />
        </div>

        {/* Right Column: Ticket Properties Sidebar */}
        <TicketSidebar 
          ticket={selectedTicket} 
          usersList={usersList} 
          onUpdate={handleUpdateTicket} 
        />
      </div>
    </main>
  );
}
