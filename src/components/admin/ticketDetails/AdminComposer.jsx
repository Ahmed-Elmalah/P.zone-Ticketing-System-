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
    <div className="p-md border-t border-outline-variant glass-card rounded-2xl mt-2 mb-2 mx-2">
      <div
        className="border border-outline-variant rounded-xl overflow-hidden
        focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary
        transition-shadow"
      >
        {/* ── Textarea ── */}
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="Type your reply... (Ctrl+Enter to send)"
          className="w-full bg-surface-container-low p-sm font-body-md text-body-md text-on-surface
            border-none focus:ring-0 resize-none outline-none
            placeholder:text-on-surface-variant"
        />

        {/* ── Footer: internal note toggle + send ── */}
        <div className="bg-surface-container-low px-sm py-sm flex justify-between items-center border-t border-outline-variant">
          <div className="flex items-center gap-md">
            <button
              type="button"
              title="Attach file"
              className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded-xl"
            >
              <MdAttachFile size={20} />
            </button>
            {/* Internal note checkbox */}
            <label className="flex items-center gap-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded text-primary focus:ring-primary h-3 w-3
                  bg-surface-container border-outline-variant"
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Internal Note Only
              </span>
            </label>
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!reply.trim()}
            className="px-lg py-sm bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] text-white rounded-xl font-extrabold
              hover:opacity-90 transition-opacity flex items-center gap-sm shadow-sm
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
