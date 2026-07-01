// ============================================================
// ConversationPanel.jsx
// Left column (50%) of the admin ticket detail.
// Contains the conversation feed with filter controls + composer.
//
// Props:
//   messages - array of message objects
//   onSend   - callback(text, isInternal) for the composer
// ============================================================

import React, { useRef, useEffect } from "react";
import AdminMessageBubble from "./AdminMessageBubble";
import StaffComposer from "../../shared/StaffComposer";

export default function ConversationPanel({ messages = [], onSend }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-1 w-full flex flex-col bg-surface border border-outline-variant
      rounded-xl shadow-sm overflow-hidden"
    >
      {/* ── Header with filter controls ── */}
      <div
        className="p-md border-b border-outline-variant bg-surface-container-low
        flex justify-between items-center"
      >
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Conversation
        </h3>
       
      </div>

      {/* ── Message list — scrollable ── */}
      <div
        className="flex-1 overflow-y-auto p-md flex flex-col gap-lg bg-background
        min-h-75 max-h-150"
        ref={chatContainerRef}
      >
        {messages.map((msg, i) => (
          <AdminMessageBubble key={i} {...msg} />
        ))}
      </div>

      {/* ── Composer — always at bottom ── */}
      <StaffComposer onSend={onSend} />
    </div>
  );
}
