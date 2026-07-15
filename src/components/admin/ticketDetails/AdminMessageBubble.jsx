// ============================================================
// AdminMessageBubble.jsx
// Renders a single message in the admin conversation feed.
//
// Three variants:
//   "system"   → centered bot message (left, gray background)
//   "customer" → left-aligned with "Customer" role badge
//   "staff"    → right-aligned with "Staff" badge, primary-container bg
//
// Reuses AttachmentChip from user/ticketDetails for file display.
//
// Props:
//   type        - "system" | "customer" | "staff"
//   senderName  - display name
//   time        - timestamp string
//   avatar      - avatar URL (optional → initials fallback)
//   lines       - array of paragraph strings
//   attachments - array of file name strings
// ============================================================

import { MdSmartToy, MdLock } from "react-icons/md";
import AttachmentChip from "../../user/ticketDetails/AttachmentChip";

// Avatar fallback — shows initials when no image provided
function AvatarFallback({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant
      flex items-center justify-center shrink-0"
    >
      <span className="font-label-md text-label-md text-on-surface-variant">
        {initials}
      </span>
    </div>
  );
}

export default function AdminMessageBubble({
  type = "customer",
  senderName = "",
  time = "",
  avatar = "",
  lines = [],
  attachments = [],
}) {
  // ── System message (bot) ──────────────────────────────────
  if (type === "system") {
    return (
      <div className="flex gap-md">
        {/* Bot avatar */}
        <div
          className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center
          border border-outline-variant shrink-0"
        >
          <MdSmartToy size={16} className="text-on-surface-variant" />
        </div>

        <div className="flex-1">
          {/* Name + time */}
          <div className="flex items-baseline gap-sm mb-xs">
            <span className="font-button-text text-on-surface">
              {senderName}
            </span>
            <span className="font-label-md text-on-surface-variant text-[10px]">
              {time}
            </span>
          </div>
          {/* Bubble */}
          <div
            className="bg-surface-container-low border border-outline-variant p-md
            rounded-lg rounded-tl-none font-body-md text-on-surface"
          >
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isInternal = type === "internal";
  const isStaff = type === "staff"; // Normal staff replies align right, internal notes align left to match the image

  return (
    <div className={`flex gap-md ${isStaff ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      {avatar ? (
        <img
          src={avatar}
          alt={senderName}
          className="w-8 h-8 rounded-full object-cover border border-outline-variant shrink-0"
        />
      ) : (
        <AvatarFallback name={senderName} />
      )}

      {/* Message content */}
      <div className={`flex-1 flex flex-col ${isStaff ? "items-end" : "items-start"}`}>
        {/* Name + role badge + time */}
        <div
          className={`flex items-center gap-sm mb-xs ${isStaff ? "flex-row-reverse" : ""}`}
        >
          <span className="font-button-text text-on-surface">{senderName}</span>
          
          {/* Badge */}
          {isInternal ? (
            <span className="px-sm py-0.5 rounded text-[10px] uppercase font-bold tracking-wide bg-[#006A4E] text-white">
              Internal Note
            </span>
          ) : (
            <span
              className={`px-xs py-0.5 rounded text-[9px] uppercase font-bold tracking-wide
              ${type === 'customer' ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-container text-on-primary-container'}`}
            >
              {type === 'customer' ? 'Customer' : 'Staff'}
            </span>
          )}

          <span className="font-label-md text-on-surface-variant text-[10px] mt-0.5">
            {time}
          </span>
        </div>

        {/* Bubble */}
        <div
          className={`p-md rounded-lg font-body-md shadow-sm max-w-[90%]
          ${
            isInternal
              ? "bg-[#6EFEB8] text-[#004D36] rounded-tl-none shadow-sm"
              : isStaff
              ? "bg-primary text-on-primary rounded-tr-none shadow-sm"
              : "bg-surface border border-outline-variant rounded-tl-none text-on-surface"
          }`}
        >
          {lines.map((line, i) => (
            <p key={i} className={i < lines.length - 1 ? "mb-sm" : ""}>
              {line}
            </p>
          ))}

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="mt-sm flex gap-sm flex-wrap">
              {attachments.map((file, index) => (
                <AttachmentChip key={file?.id || file?.documentId || file?.name || index} fileName={file} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
