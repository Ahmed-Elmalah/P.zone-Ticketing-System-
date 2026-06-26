// ============================================================
// SystemNote.jsx
// Centered pill-shaped note for system events in the feed.
// Used for: ticket assigned, status changed, escalated, etc.
//
// Props:
//   text  - the event description
//   icon  - optional react-icon component (defaults to MdInfo)
// ============================================================

import { MdInfo } from "react-icons/md";

export default function SystemNote({ text = "", icon: Icon = MdInfo }) {
  return (
    <div className="flex justify-center my-lg">
      <div
        className="bg-surface-container px-md py-xs rounded-full flex items-center gap-sm
        shadow-sm border border-outline-variant"
      >
        <Icon size={16} className="text-on-surface-variant" />
        <span className="font-label-md text-label-md text-on-surface-variant">
          {text}
        </span>
      </div>
    </div>
  );
}
