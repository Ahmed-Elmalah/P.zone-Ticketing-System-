import React from "react";

export default function TicketsFilters({
  statusFilter, onStatusFilter,
  categoryFilter, onCategoryFilter,
  priorityFilter, onPriorityFilter,
  assigneeFilter, onAssigneeFilter,
  categories = [],
  users = [],
}) {
  const agentsOnly = users.filter(
    (u) =>
      u.role?.type === "help" ||
      u.role?.type === "admin" ||
      u.role?.name?.toLowerCase().includes("help")
  );

  return (
    <div className="flex flex-col gap-sm">
      <h2 className="font-headline-lg text-headline-lg text-on-surface">
        All System Tickets
      </h2>

      {/* ── Filters Group ── */}
      <div className="flex flex-wrap gap-md items-center">
        {/* Status Filter */}
        <select 
          value={statusFilter}
          onChange={(e) => onStatusFilter(e.target.value)}
          className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none"
        >
          <option value="">Status: All</option>
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Category Filter */}
        <select 
          value={categoryFilter}
          onChange={(e) => onCategoryFilter(e.target.value)}
          className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none"
        >
          <option value="">Category: All</option>
          {categories.map((c) => (
            <option key={c.documentId || c.id} value={c.documentId || c.id}>{c.name || c.title}</option>
          ))}
        </select>

        {/* Priority Filter */}
        <select 
          value={priorityFilter}
          onChange={(e) => onPriorityFilter(e.target.value)}
          className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none"
        >
          <option value="">Priority: All</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Assignee Filter */}
        <select 
          value={assigneeFilter}
          onChange={(e) => onAssigneeFilter(e.target.value)}
          className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none"
        >
          <option value="">Assignee: Anyone</option>
          <option value="unassigned">Unassigned</option>
          {agentsOnly.map((a) => (
            <option key={a.documentId || a.id} value={a.documentId || a.id}>{a.username}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
