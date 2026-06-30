import React, { useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdAttachFile,
  MdEmojiEmotions,
  MdSend,
} from "react-icons/md";

export default function HelpReplyBox({ onSend }) {
  // State to track current tab: "reply" or "internal"
  const [activeTab, setActiveTab] = useState("reply");
  const [replyText, setReplyText] = useState("");

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSend?.(replyText, activeTab);
    setReplyText("");
  };

  return (
    <div className="shrink-0 bg-surface-container-lowest border-t border-outline-variant p-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-3xl mx-auto flex flex-col gap-sm">
        
        {/* ── Tabs: Reply vs Internal Note ── */}
        <div className="flex gap-md mb-sm">
          <button
            onClick={() => setActiveTab("reply")}
            className={`font-label-md text-label-md pb-1 transition-colors ${
              activeTab === "reply"
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Reply to User
          </button>
          <button
            onClick={() => setActiveTab("internal")}
            className={`font-label-md text-label-md pb-1 transition-colors ${
              activeTab === "internal"
                ? "text-secondary border-b-2 border-secondary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Internal Note
          </button>
        </div>

        {/* ── Input Area ── */}
        <div className={`relative rounded-lg border focus-within:ring-1 transition-all overflow-hidden shadow-sm ${
          activeTab === "internal" 
            ? "bg-surface-container-low border-secondary/50 focus-within:border-secondary focus-within:ring-secondary" 
            : "bg-surface border-outline-variant focus-within:border-primary focus-within:ring-primary"
        }`}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 resize-none p-md font-body-md text-body-md text-on-surface placeholder-on-surface-variant outline-none"
            placeholder={activeTab === "internal" ? "Add an internal note for agents..." : "Type your reply here..."}
            rows={3}
          />
          
          {/* Toolbar */}
          <div className="flex justify-between items-center p-sm bg-surface-container-lowest border-t border-outline-variant">
            <div className="flex gap-xs">
              <button className="p-xs text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-colors" title="Attach file">
                <MdAttachFile size={20} />
              </button>
            </div>
            <div className="flex items-center gap-sm">
              <button
                onClick={handleSend}
                disabled={!replyText.trim()}
                className={`${
                  activeTab === "internal" ? "bg-secondary" : "bg-primary"
                } text-on-primary font-button-text text-button-text py-2 px-lg rounded-lg shadow-sm transition-all flex items-center gap-sm disabled:opacity-50`}
              >
                {activeTab === "internal" ? "Add Note" : "Send Reply"}
                <MdSend size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}