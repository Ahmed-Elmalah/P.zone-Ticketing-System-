// ============================================================
// ReplyBox.jsx
// Sticky reply input box at the bottom of the conversation.
// Includes formatting toolbar + send button.
//
// Props:
//   onSend - callback(replyText) called when user hits Send
// ============================================================

import { useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdAttachFile,
  MdEmojiEmotions,
  MdSend,
} from "react-icons/md";

// Formatting buttons config — add more here if needed
const FORMAT_BUTTONS = [
  { icon: MdFormatBold, title: "Bold" },
  { icon: MdFormatItalic, title: "Italic" },
  { icon: MdAttachFile, title: "Attach file" },
  { icon: MdEmojiEmotions, title: "Emoji" },
];

export default function ReplyBox({ onSend }) {
  const [reply, setReply] = useState("");

  const handleSend = () => {
    const trimmed = reply.trim();
    if (!trimmed) return;
    onSend?.(trimmed); // call parent handler if provided
    setReply("");
  };

  // Allow Ctrl+Enter to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSend();
  };

  return (
    <div
      className="sticky bottom-0 left-0 right-0
      bg-surface-container-lowest border-t border-outline-variant p-md
      shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-sm">
        {/* Tab label */}
        <div className="flex gap-sm mb-sm">
          <span className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1">
            Reply
          </span>
        </div>

        {/* Textarea + toolbar wrapper */}
        <div
          className="relative bg-surface rounded-lg border border-outline-variant
          focus-within:border-primary focus-within:ring-1 focus-within:ring-primary
          transition-all overflow-hidden shadow-sm"
        >
          {/* Textarea */}
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Type your reply here... (Ctrl+Enter to send)"
            className="w-full bg-transparent border-none focus:ring-0 resize-none
              p-md font-body-md text-body-md text-on-surface
              placeholder:text-on-surface-variant outline-none"
          />

          {/* Toolbar */}
          <div
            className="flex justify-between items-center p-sm
            bg-surface-container-lowest border-t border-outline-variant"
          >
            {/* Formatting buttons */}
            <div className="flex gap-xs">
              {FORMAT_BUTTONS.map(({ icon: Icon, title }) => (
                <button
                  key={title}
                  type="button"
                  title={title}
                  className="p-xs text-on-surface-variant hover:text-primary
                    hover:bg-surface-container rounded transition-colors"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>

            {/* Send button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!reply.trim()}
              className="bg-primary text-on-primary font-button-text text-button-text
                py-2 px-lg rounded-lg shadow-sm hover:bg-on-primary-fixed-variant
                transition-all flex items-center gap-sm
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Reply
              <MdSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
