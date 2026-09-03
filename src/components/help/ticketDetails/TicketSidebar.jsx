import React from "react";
import CustomDropdown from "../../shared/CustomDropdown";

export default function TicketSidebar({ ticket, usersList, onUpdate }) {
  // Extract lists for dropdowns (Assuming help desk agents are those with help or admin roles)
  const agentUsers = usersList.filter(u => u.role?.type === 'help' || u.role?.type === 'admin' || u.role?.name?.toLowerCase().includes('help'));

  return (
    <aside className="w-full h-full overflow-y-auto p-margin-desktop flex flex-col gap-lg z-10">
      <h2 className="font-headline-md text-headline-md text-on-surface">
        Ticket Properties
      </h2>

      {/* Status Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Status
        </label>
        <CustomDropdown
          variant="form"
          searchable={false}
          value={ticket.state || "Open"} 
          onChange={(val) => onUpdate({ state: val })}
          options={[
            { value: "Open", label: "Open" },
            { value: "InProgress", label: "In Progress" },
            { value: "Resolved", label: "Resolved" },
            { value: "Closed", label: "Closed" },
          ]}
        />
      </div>

      {/* Priority Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Priority
        </label>
        <CustomDropdown
          variant="form"
          searchable={false}
          value={ticket.priority || "Low"}
          onChange={(val) => onUpdate({ priority: val })}
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
            { value: "Critical", label: "Critical" },
          ]}
        />
      </div>

      {/* Assignee Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Assignee
        </label>
        <CustomDropdown
          variant="form"
          searchable={true}
          value={ticket.assignee?.documentId || ticket.assignee?.id || "unassigned"}
          onChange={(val) => onUpdate({ assignee: val === "unassigned" ? null : val })}
          placeholder="Unassigned"
          options={[
            { value: "unassigned", label: "Unassigned" },
            ...agentUsers.map(agent => ({
              value: agent.documentId || agent.id,
              label: `${agent.username} (${agent.role?.name || "Agent"})`,
            })),
          ]}
        />
      </div>

      {/* Requester Info */}
      <div className="flex flex-col gap-sm mt-md pt-md border-t border-outline-variant">
        <h3 className="font-title-md text-title-md text-on-surface">
          Requester Info
        </h3>
        <div className="flex flex-col gap-xs font-body-sm text-body-sm text-on-surface-variant">
          <p><strong className="text-on-surface font-label-md">Name:</strong> {ticket.creator?.fullName || ticket.creator?.username || "N/A"}</p>
          <p><strong className="text-on-surface font-label-md">Email:</strong> {ticket.creator?.email || "N/A"}</p>
          <p><strong className="text-on-surface font-label-md">Phone:</strong> {ticket.creator?.phoneNumber || "N/A"}</p>
          <p><strong className="text-on-surface font-label-md">Device/Laptop:</strong> {ticket.creator?.deviceNumber || ticket.creator?.laptopNumber || "N/A"}</p>
        </div>
      </div>
    </aside>
  );
}
