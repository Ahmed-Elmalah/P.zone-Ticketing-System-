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

import { MdEdit, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Priority badge config
const PRIORITY_CONFIG = {
  Low: {
    label: "Low Priority",
    className: "bg-surface-container text-on-surface-variant",
  },
  Medium: {
    label: "Medium Priority",
    className: "bg-secondary-container text-on-secondary-container",
  },
  High: {
    label: "High Priority",
    className: "bg-error-container text-on-error-container",
  },
  Critical: { label: "Critical", className: "bg-error text-on-error" },
};

export default function AdminTicketHeader({
  ticketRef = "#INC-0000",
  title = "Ticket Details",
  priority = "Medium",
}) {
  const priorityCfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.High;
  const navigate = useNavigate();

  return (
    <div className="bg-surface border-b border-outline-variant px-margin-desktop py-sm md:py-lg sticky top-0 z-50">
      <div className="flex flex-col gap-xs max-w-360 mx-auto">
        {/* Top actions + Priority badge + ticket ref */}
        <div className="flex items-center gap-sm">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-1 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
            title="Go Back"
          >
            <MdArrowBack size={20} />
          </button>
          
          <span
            className={`px-sm py-xs rounded-md font-label-md text-[10px] uppercase tracking-wider
            ${priorityCfg.className}`}
          >
            {priorityCfg.label || priority}
          </span>
          <span className="font-body-md text-on-surface-variant">
            {ticketRef}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-sm group cursor-pointer mt-1">
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
