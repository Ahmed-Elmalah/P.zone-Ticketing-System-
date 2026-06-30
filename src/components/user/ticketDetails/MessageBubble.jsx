// ============================================================
// MessageBubble.jsx
// Renders a single message in the conversation feed.
// type="customer" → left-aligned, white bubble
// type="agent"    → right-aligned, primary-container bubble
//
// Props:
//   type        - "customer" | "agent"
//   senderName  - display name of the sender
//   time        - message timestamp string
//   avatar      - avatar URL (optional — shows initials if missing)
//   lines       - array of paragraph strings
//   attachments - array of file name strings
// ============================================================

import AttachmentChip from "./AttachmentChip";

// Initials fallback when no avatar image
function AvatarFallback({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container
      flex items-center justify-center font-bold shrink-0 shadow-sm"
    >
      {initials}
    </div>
  );
}

export default function MessageBubble({
  type = "customer",
  senderName = "",
  time = "",
  avatar = "",
  lines = [],
  attachments = [],
  isInternal = false,
  isOwnMessage = false,
}) {
  const isRightAligned = isOwnMessage;

  return (
    <div
      className={`flex gap-md max-w-3xl ${isRightAligned ? "ml-auto flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      {avatar ? (
        <img
          src={avatar}
          alt={senderName}
          className="w-10 h-10 rounded-full shadow-sm object-cover shrink-0"
        />
      ) : (
        <AvatarFallback name={senderName} />
      )}

      {/* Message content */}
      <div className={`flex-1 flex flex-col ${isRightAligned ? "items-end" : "items-start"}`}>
        {/* Name + time */}
        <div
          className={`flex items-baseline gap-sm mb-1 ${isRightAligned ? "flex-row-reverse" : ""}`}
        >
          <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
            {senderName}
            {isInternal && (
              <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                Internal Note
              </span>
            )}
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant text-xs">
            {time}
          </span>
        </div>

        {/* Bubble */}
        <div
          className={`p-md shadow-sm
          ${
            isInternal
              ? "bg-secondary-container text-on-secondary-container border border-secondary/30 rounded-lg rounded-tr-none"
              : isOwnMessage
              ? "bg-primary text-on-primary rounded-lg rounded-tr-none"
              : "bg-surface-container-lowest border border-outline-variant rounded-lg rounded-tl-none"
          }`}
        >
          {/* Paragraph lines */}
          {lines.map((line, i) => (
            <p
              key={i}
              className={`font-body-lg text-body-lg ${i < lines.length - 1 ? "mb-sm" : ""}`}
            >
              {line}
            </p>
          ))}

          {/* Attachments row */}
          {attachments.length > 0 && (
            <div className="mt-md pt-sm border-t border-outline-variant flex gap-sm flex-wrap">
              {attachments.map((file, idx) => (
                <AttachmentChip key={file.id || idx} fileName={file} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
