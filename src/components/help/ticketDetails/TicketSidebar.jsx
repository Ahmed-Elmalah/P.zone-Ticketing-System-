import React from "react";

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
        <select 
          value={ticket.state || "Open"} 
          onChange={(e) => onUpdate({ state: e.target.value })}
          className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm cursor-pointer"
        >
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Priority Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Priority
        </label>
        <select 
          value={ticket.priority || "Low"}
          onChange={(e) => onUpdate({ priority: e.target.value })}
          className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm cursor-pointer"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      {/* Assignee Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Assignee
        </label>
        <select 
          value={ticket.assignee?.documentId || ticket.assignee?.id || "unassigned"}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ assignee: val === "unassigned" ? null : val });
          }}
          className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm cursor-pointer"
        >
          <option value="unassigned">Unassigned</option>
          {agentUsers.map(agent => (
            <option key={agent.id} value={agent.documentId || agent.id}>
              {agent.username} ({agent.role?.name})
            </option>
          ))}
        </select>
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
