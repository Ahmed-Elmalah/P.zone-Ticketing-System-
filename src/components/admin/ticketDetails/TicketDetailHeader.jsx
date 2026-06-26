// ============================================================
// AdminTicketHeader.jsx
// Sticky header for the admin ticket detail page.
// Shows: priority badge, ticket ref, and title.
// Action buttons commented out — enable when needed.
//
// Props:
//   ticketRef - e.g. "#INC-2023-8942"
//   title     - ticket title
//   priority  - "low" | "medium" | "high" | "critical"
// ============================================================

import { MdEdit } from "react-icons/md";

// Priority badge config
const PRIORITY_CONFIG = {
  low: {
    label: "Low Priority",
    className: "bg-surface-container text-on-surface-variant",
  },
  medium: {
    label: "Medium Priority",
    className: "bg-secondary-container text-on-secondary-container",
  },
  high: {
    label: "High Priority",
    className: "bg-error-container text-on-error-container",
  },
  critical: { label: "Critical", className: "bg-error text-on-error" },
};

export default function AdminTicketHeader({
  ticketRef = "#INC-0000",
  title = "Ticket Details",
  priority = "high",
}) {
  const priorityCfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.high;

  return (
    // Reduced vertical padding on mobile (py-sm), full on desktop (md:py-lg)
    <div className="bg-surface border-b border-outline-variant px-margin-desktop py-sm md:py-lg sticky top-0 z-50">
      <div className="flex flex-col gap-xs max-w-360 mx-auto">
        {/* Priority badge + ticket ref */}
        <div className="flex items-center gap-sm">
          <span
            className={`px-sm py-xs rounded-md font-label-md text-[10px] uppercase tracking-wider
            ${priorityCfg.className}`}
          >
            {priorityCfg.label}
          </span>
          <span className="font-body-md text-on-surface-variant">
            {ticketRef}
          </span>
        </div>

        {/* Title
            Mobile/tablet → headline-lg-mobile (24px)
            Desktop       → headline-lg        (32px)  */}
        <div className="flex items-center gap-sm group cursor-pointer">
          <h2
            className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg
            text-on-surface group-hover:text-primary transition-colors"
          >
            {title}
          </h2>
          <MdEdit
            size={16}
            className="text-outline group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
}
