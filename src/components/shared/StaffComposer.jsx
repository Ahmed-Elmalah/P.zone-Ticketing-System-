import React, { useState, useRef } from "react";
import { MdAttachFile, MdSend, MdClose } from "react-icons/md";

export default function StaffComposer({ onSend }) {
  const [activeTab, setActiveTab] = useState("reply");
  const [replyText, setReplyText] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!replyText.trim() && files.length === 0) return;
    onSend?.(replyText, activeTab, files);
    setReplyText("");
    setFiles([]);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
    // reset input so the same file can be selected again if removed
    e.target.value = '';
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="shrink-0 bg-surface border-t border-outline-variant p-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
        <div className={`relative rounded-lg border focus-within:ring-1 transition-all overflow-hidden shadow-sm flex flex-col ${
          activeTab === "internal" 
            ? "bg-surface-container-low border-secondary/50 focus-within:border-secondary focus-within:ring-secondary" 
            : "bg-surface-container-lowest border-outline-variant focus-within:border-primary focus-within:ring-primary"
        }`}>
          
          {/* Selected Files Area */}
          {files.length > 0 && (
            <div className="p-sm flex gap-sm flex-wrap border-b border-outline-variant/30 bg-surface-container-lowest">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-xs bg-surface-variant text-on-surface-variant px-xs py-1 rounded text-[11px] font-label-md border border-outline-variant/50">
                  <span className="truncate max-w-37.5">{file.name}</span>
                  <button onClick={() => removeFile(index)} className="hover:text-error text-on-surface-variant">
                    <MdClose size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSend();
            }}
            disabled={files.length > 0}
            className="w-full bg-transparent border-none focus:ring-0 resize-none p-md font-body-md text-body-md text-on-surface placeholder-on-surface-variant outline-none disabled:opacity-50"
            placeholder={files.length > 0 ? "Text disabled when an image is attached. Send them separately." : (activeTab === "internal" ? "Add an internal note for agents... (Ctrl+Enter to send)" : "Type your reply here... (Ctrl+Enter to send)")}
            rows={3}
          />
          
          {/* Toolbar */}
          <div className="flex justify-between items-center p-sm bg-surface-container-low border-t border-outline-variant">
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
                disabled={replyText.trim().length > 0}
                className={`p-xs rounded transition-colors ${
                  replyText.trim().length > 0 
                    ? 'text-outline opacity-50 cursor-not-allowed' 
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`} 
                title={replyText.trim().length > 0 ? "Send text first, then attach an image separately." : "Attach file"}
              >
                <MdAttachFile size={20} />
              </button>
            </div>
            <div className="flex items-center gap-sm">
              <button
                onClick={handleSend}
                disabled={!replyText.trim() && files.length === 0}
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
