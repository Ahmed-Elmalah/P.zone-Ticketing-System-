import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MdAssignmentInd } from "react-icons/md";

import TicketDetailHeader from "../../components/user/ticketDetails/TicketDetailHeader";
import MessageBubble from "../../components/user/ticketDetails/MessageBubble";
import SystemNote from "../../components/user/ticketDetails/SystemNote";
import ReplyBox from "../../components/user/ticketDetails/ReplyBox";

import useTicketStore from "../../store/useTicketStore";
import useChatStore from "../../store/useChatStore";
import { useAuthStore } from "../../auth/authStore";

export default function TicketDetail() {
  const { id } = useParams();
  const { selectedTicket, fetchTicketById, clearSelectedTicket } = useTicketStore();
  const { messages, fetchMessages, sendMessage, clearMessages } = useChatStore();
  const { user } = useAuthStore();
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchTicketById(id);
      fetchMessages(id);
    }

    // Cleanup on unmount — so messages don't bleed between tickets
    return () => {
      clearMessages();
      clearSelectedTicket();
    };
  }, [id, fetchTicketById, fetchMessages, clearMessages, clearSelectedTicket]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async (replyText, files) => {
    if (!replyText.trim() && (!files || files.length === 0)) return;
    try {
      // Save message to Strapi
      await sendMessage({
        content: replyText,
        ticket: id,
        sender: user?.id, // links the message to the current logged-in user
      }, files);
      // Re-fetch messages to get fully populated sender data and show latest state
      await fetchMessages(id);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!selectedTicket) {
    return (
      <div className="flex h-screen items-center justify-center text-on-surface-variant">
        Loading ticket details...
      </div>
    );
  }

  return (
    <main className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex-none w-full bg-surface-container-lowest border-b border-outline-variant">
        <div className="w-full mx-auto">
          <TicketDetailHeader
            title={selectedTicket.subject}
            ticketRef={selectedTicket.documentId?.substring(0, 8).toUpperCase() || selectedTicket.id}
            status={selectedTicket.state}
            createdAt={new Date(selectedTicket.createdAt).toLocaleString()}
            channel="Web"
          />
        </div>
      </header>

      {/* Chat Area — shows only Messages from the Messages collection */}
      <div className="flex-1 overflow-y-auto bg-surface-bright">
        <div className="max-w-4xl mx-auto p-margin-desktop space-y-xl">

          {/* System note if ticket has been assigned */}
          {selectedTicket.assignee && (
            <SystemNote
              text={`Ticket assigned to ${selectedTicket.assignee.username}`}
              icon={MdAssignmentInd}
            />
          )}

          {/* Render messages from the Messages collection */}
          {messages.length === 0 ? (
            <div className="text-center text-on-surface-variant py-xl">
              No messages yet. Send the first message!
            </div>
          ) : (
            messages.map((msg) => {
              // Hide internal notes from regular users
              if (msg.isInternalNote) return null;

              // Determine if message is from agent or customer
              const senderRole = msg.sender?.role?.type;
              const isAgent = senderRole === 'admin' || senderRole === 'help';

              return (
                <MessageBubble
                  key={msg.documentId || msg.id}
                  type={isAgent ? 'agent' : 'customer'}
                  senderName={msg.sender?.username || user?.username || 'You'}
                  time={new Date(msg.createdAt).toLocaleString()}
                  avatar={msg.sender?.avatar?.url}
                  lines={[msg.content]}
                  attachments={msg.attachments || []}
                  isOwnMessage={msg.sender?.documentId === user?.documentId || msg.sender?.id === user?.id}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ReplyBox */}
      <footer className="flex-none">
        <ReplyBox onSend={handleSendReply} />
      </footer>
    </main>
  );
}
