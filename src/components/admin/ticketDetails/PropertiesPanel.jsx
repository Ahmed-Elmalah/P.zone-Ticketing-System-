// ============================================================
// PropertiesPanel.jsx
// Middle column (25%) of the admin ticket detail.
// Stacks: Status → Assignee → Details → Requester → SLA
// Takes its natural height — no internal scroll.
//
// Props:
//   status    - current status string
//   assignee  - { name, avatar }
//   priority  - "low" | "medium" | "high" | "critical"
//   category  - category string
//   requester - { department, location, device }
//   sla       - { remaining, percentUsed }
// ============================================================

import {
  MdExpandMore,
  MdPersonAdd,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

// Section header — reused in every card
function SectionLabel({ children }) {
  return (
    <h4 className="font-label-md text-on-surface-variant mb-sm uppercase tracking-widest">
      {children}
    </h4>
  );
}

// Divider between detail rows
function Divider() {
  return <div className="h-px bg-outline-variant w-full" />;
}

export default function PropertiesPanel({
  status = "in_progress",
  assignee = { name: "Unassigned", avatar: "" },
  priority = "high",
  category = "General",
  requester = {},
  sla = { remaining: "1h 12m", percentUsed: 80 },
}) {
  // SLA bar color: >80% used → error, >50% → tertiary, else primary
  const slaBarColor =
    sla.percentUsed >= 80
      ? "bg-error"
      : sla.percentUsed >= 50
        ? "bg-tertiary"
        : "bg-primary";

  return (
    // Natural height — no scroll, no max-h
    <div className="lg:w-1/4 flex flex-col gap-md">
      {/* ── Status card ── */}
      <div className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
        <SectionLabel>Status</SectionLabel>
        <div
          className="flex items-center justify-between p-sm bg-surface-container-low
          border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div className="flex items-center gap-sm">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="font-button-text text-on-surface capitalize">
              {status.replace("_", " ")}
            </span>
          </div>
          <MdExpandMore size={20} className="text-outline" />
        </div>
      </div>

      {/* ── Assignee card ── */}
      <div className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
        <SectionLabel>Assignee</SectionLabel>
        <div
          className="flex items-center justify-between p-sm border border-outline-variant
          rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors group"
        >
          <div className="flex items-center gap-sm">
            <div
              className="w-6 h-6 rounded-full overflow-hidden border border-outline-variant
              bg-surface-variant flex items-center justify-center"
            >
              {assignee.avatar ? (
                <img
                  src={assignee.avatar}
                  alt={assignee.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[10px] font-bold text-on-surface-variant">
                  {assignee.name[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <span className="font-button-text text-on-surface">
              {assignee.name}
            </span>
          </div>
          <MdPersonAdd
            size={18}
            className="text-outline group-hover:text-primary transition-colors"
          />
        </div>
      </div>

      {/* ── Details card: priority + category ── */}
      <div className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm flex flex-col gap-md">
        <div>
          <SectionLabel>Priority</SectionLabel>
          <div className="flex items-center gap-sm">
            <MdKeyboardDoubleArrowUp size={16} className="text-error" />
            <span className="font-body-md text-on-surface font-semibold capitalize">
              {priority}
            </span>
          </div>
        </div>
        <Divider />
        <div>
          <SectionLabel>Category</SectionLabel>
          <span
            className="inline-block px-sm py-xs bg-surface-container border
            border-outline-variant rounded text-on-surface font-body-md text-sm"
          >
            {category}
          </span>
        </div>
      </div>

      {/* ── Requester data card ── */}
      {Object.keys(requester).length > 0 && (
        <div className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm">
          <SectionLabel>Requester Data</SectionLabel>
          <div className="flex flex-col gap-sm">
            {Object.entries(requester).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="font-label-md text-on-surface-variant capitalize">
                  {key}
                </span>
                <span className="font-body-md text-on-surface font-semibold">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SLA resolution card ── */}
      <div
        className="bg-surface border border-outline-variant border-l-4 border-l-error
        rounded-xl p-md shadow-sm"
      >
        <SectionLabel>SLA Resolution</SectionLabel>
        <div className="flex items-end gap-sm">
          <span className="font-headline-lg text-headline-lg text-error leading-none">
            {sla.remaining}
          </span>
          <span className="font-body-md text-on-surface-variant mb-1">
            remaining
          </span>
        </div>
        <div className="w-full bg-surface-variant h-1 rounded-full mt-sm overflow-hidden">
          <div
            className={`${slaBarColor} h-full rounded-full transition-all`}
            style={{ width: `${sla.percentUsed}%` }}
          />
        </div>
      </div>
    </div>
  );
}
