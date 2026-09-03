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
import CustomDropdown from "../../shared/CustomDropdown";

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
  status = "Open",
  onStatusChange,
  assignee = { id: "", name: "Unassigned", avatar: "" },
  onAssigneeChange,
  agents = [], // list of agents for the assignee dropdown
  priority = "Medium",
  category = "General",
  requester = {},
}) {
  return (
    // Natural height — no scroll, no max-h
    <div className="w-full flex flex-col gap-md">
      {/* ── Status card ── */}
      <div className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm flex flex-col gap-xs">
        <SectionLabel>Status</SectionLabel>
        <CustomDropdown
          variant="card"
          searchable={false}
          value={status === "In Progress" ? "InProgress" : status}
          onChange={(val) => onStatusChange && onStatusChange(val)}
          options={[
            { value: "Open", label: "Open" },
            { value: "InProgress", label: "In Progress" },
            { value: "Resolved", label: "Resolved" },
            { value: "Closed", label: "Closed" },
          ]}
        />
      </div>

      {/* ── Assignee card ── */}
      <div className="bg-surface border border-outline-variant rounded-xl p-md shadow-sm flex flex-col gap-xs">
        <SectionLabel>Assignee</SectionLabel>
        <CustomDropdown
          variant="card"
          searchable={true}
          value={assignee.id || "unassigned"}
          onChange={(val) => onAssigneeChange && onAssigneeChange(val)}
          placeholder="Unassigned"
          options={[
            { value: "unassigned", label: "Unassigned" },
            ...agents.map((a) => ({
              value: a.documentId || a.id,
              label: a.username,
            })),
          ]}
        />
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
    </div>
  );
}
