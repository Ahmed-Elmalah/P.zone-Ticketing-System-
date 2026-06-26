// ============================================================
// AdminComposer.jsx
// Rich reply composer for admin ticket detail.
// Has formatting toolbar, "Internal Note Only" toggle, and send.
//
// Props:
//   onSend - callback(text, isInternal) when Send is clicked
// ============================================================

import { useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdAttachFile,
  MdSend,
} from "react-icons/md";

const FORMAT_BUTTONS = [
  { icon: MdFormatBold, title: "Bold" },
  { icon: MdFormatItalic, title: "Italic" },
  { icon: MdFormatListBulleted, title: "List" },
];

export default function AdminComposer({ onSend }) {
  const [reply, setReply] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  const handleSend = () => {
    const trimmed = reply.trim();
    if (!trimmed) return;
    onSend?.(trimmed, isInternal);
    setReply("");
  };

  // Ctrl+Enter sends
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSend();
  };

  return (
    <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
      <div
        className="border border-outline-variant rounded-lg overflow-hidden
        focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent
        transition-shadow"
      >
        {/* ── Format toolbar ── */}
        <div className="bg-surface-container-low px-sm py-xs flex gap-xs border-b border-outline-variant">
          {FORMAT_BUTTONS.map(({ icon: Icon, title }) => (
            <button
              key={title}
              type="button"
              title={title}
              className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded"
            >
              <Icon size={18} />
            </button>
          ))}

          {/* Vertical divider */}
          <div className="w-px h-4 bg-outline-variant my-auto mx-xs" />

          <button
            type="button"
            title="Attach file"
            className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded"
          >
            <MdAttachFile size={18} />
          </button>
        </div>

        {/* ── Textarea ── */}
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="Type your reply... (Ctrl+Enter to send)"
          className="w-full bg-surface p-sm font-body-md text-body-md text-on-surface
            border-none focus:ring-0 resize-none outline-none
            placeholder:text-on-surface-variant"
        />

        {/* ── Footer: internal note toggle + send ── */}
        <div className="bg-surface px-sm py-sm flex justify-between items-center border-t border-outline-variant">
          {/* Internal note checkbox */}
          <label className="flex items-center gap-xs cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-3 w-3
                bg-surface-container border-outline-variant"
            />
            <span className="font-label-md text-on-surface-variant text-[11px]">
              Internal Note Only
            </span>
          </label>

          {/* Send button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!reply.trim()}
            className="px-lg py-sm bg-primary text-on-primary rounded-md font-button-text
              hover:opacity-90 transition-opacity flex items-center gap-sm
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
            <MdSend size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
