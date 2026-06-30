// ============================================================
// ConversationPanel.jsx
// Left column (50%) of the admin ticket detail.
// Contains the conversation feed with filter controls + composer.
//
// Props:
//   messages - array of message objects
//   onSend   - callback(text, isInternal) for the composer
// ============================================================

import AdminMessageBubble from "./AdminMessageBubble";
import AdminComposer from "./AdminComposer";

export default function ConversationPanel({ messages = [], onSend }) {
  return (
    <div
      className="flex-1 w-full flex flex-col bg-surface border border-outline-variant
      rounded-xl shadow-sm overflow-hidden"
    >
      {/* ── Header with filter controls ── */}
      <div
        className="p-md border-b border-outline-variant bg-surface-container-lowest
        flex justify-between items-center"
      >
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Conversation
        </h3>

        {/* Filter tabs: All Messages / Internal Only */}
        <div className="flex bg-surface-container-low p-xs rounded-lg">
          <button
            className="px-sm py-xs bg-surface-container-lowest text-primary rounded-md
            font-label-md text-[10px] uppercase tracking-wide shadow-sm"
          >
            All Messages
          </button>
          <button
            className="px-sm py-xs text-on-surface-variant hover:text-on-surface
            rounded-md font-label-md text-[10px] uppercase tracking-wide transition-colors"
          >
            Internal Only
          </button>
        </div>
      </div>

      {/* ── Message list — scrollable ── */}
      <div
        className="flex-1 overflow-y-auto p-md flex flex-col gap-lg bg-surface-container-lowest
        min-h-75 max-h-[600px]"
      >
        {messages.map((msg, i) => (
          <AdminMessageBubble key={i} {...msg} />
        ))}
      </div>

      {/* ── Composer — always at bottom ── */}
      <AdminComposer onSend={onSend} />
    </div>
  );
}
