// ============================================================
// ReplyBox.jsx
// Sticky reply input box at the bottom of the conversation.
// Includes formatting toolbar + send button.
//
// Props:
//   onSend - callback(replyText) called when user hits Send
// ============================================================

import { useState, useRef } from "react";
import { MdAttachFile, MdSend, MdClose } from "react-icons/md";

export default function ReplyBox({ onSend }) {
  const [reply, setReply] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    const trimmed = reply.trim();
    if (!trimmed && files.length === 0) return;
    onSend?.(trimmed, files); // call parent handler if provided
    setReply("");
    setFiles([]);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
    e.target.value = '';
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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
          transition-all overflow-hidden shadow-sm flex flex-col"
        >
          {/* Selected Files Area */}
          {files.length > 0 && (
            <div className="p-sm flex gap-sm flex-wrap border-b border-outline-variant/30 bg-surface-container-lowest">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-xs bg-surface-variant text-on-surface-variant px-xs py-1 rounded text-[11px] font-label-md border border-outline-variant/50">
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button onClick={() => removeFile(index)} className="hover:text-error text-on-surface-variant">
                    <MdClose size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={files.length > 0}
            rows={3}
            placeholder={files.length > 0 ? "Text disabled when an image is attached. Send them separately." : "Type your reply here... (Ctrl+Enter to send)"}
            className="w-full bg-transparent border-none focus:ring-0 resize-none
              p-md font-body-md text-body-md text-on-surface
              placeholder:text-on-surface-variant outline-none disabled:opacity-50"
          />

          {/* Toolbar */}
          <div
            className="flex justify-between items-center p-sm
            bg-surface-container-lowest border-t border-outline-variant"
          >
            {/* Formatting buttons */}
            <div className="flex gap-xs">
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={reply.trim().length > 0}
                title={reply.trim().length > 0 ? "Send text first, then attach an image separately." : "Attach file"}
                className={`p-xs rounded transition-colors ${
                  reply.trim().length > 0
                    ? "text-outline opacity-50 cursor-not-allowed"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                }`}
              >
                <MdAttachFile size={20} />
              </button>
            </div>

            {/* Send button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!reply.trim() && files.length === 0}
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
