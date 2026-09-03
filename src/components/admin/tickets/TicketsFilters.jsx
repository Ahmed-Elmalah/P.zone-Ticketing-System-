import React from "react";
import CustomDropdown from "../../shared/CustomDropdown";

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
        <CustomDropdown
          value={statusFilter}
          onChange={onStatusFilter}
          placeholder="Status: All"
          searchable={false}
          options={[
            { value: "", label: "Status: All" },
            { value: "Open", label: "Open" },
            { value: "InProgress", label: "In Progress" },
            { value: "Resolved", label: "Resolved" },
            { value: "Closed", label: "Closed" },
          ]}
        />

        {/* Category Filter */}
        <CustomDropdown
          value={categoryFilter}
          onChange={onCategoryFilter}
          placeholder="Category: All"
          searchable={true}
          options={[
            { value: "", label: "Category: All" },
            ...categories.map((c) => ({
              value: c.documentId || c.id,
              label: c.name || c.title,
            })),
          ]}
        />

        {/* Priority Filter */}
        <CustomDropdown
          value={priorityFilter}
          onChange={onPriorityFilter}
          placeholder="Priority: All"
          searchable={false}
          options={[
            { value: "", label: "Priority: All" },
            { value: "Critical", label: "Critical" },
            { value: "High", label: "High" },
            { value: "Medium", label: "Medium" },
            { value: "Low", label: "Low" },
          ]}
        />

        {/* Assignee Filter */}
        <CustomDropdown
          value={assigneeFilter}
          onChange={onAssigneeFilter}
          placeholder="Assignee: Anyone"
          searchable={true}
          options={[
            { value: "", label: "Assignee: Anyone" },
            { value: "unassigned", label: "Unassigned" },
            ...agentsOnly.map((a) => ({
              value: a.documentId || a.id,
              label: a.username,
            })),
          ]}
        />
      </div>
    </div>
  );
}
