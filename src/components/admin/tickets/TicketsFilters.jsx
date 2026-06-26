import React from "react";

export default function TicketsFilters() {
  return (
    <div className="flex flex-col gap-sm">
      <h2 className="font-headline-lg text-headline-lg text-on-surface">
        All System Tickets
      </h2>

      {/* ── Filters Group ── */}
      <div className="flex flex-wrap gap-md items-center">
        {/* Status Filter */}
        <select className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none">
          <option>Status: All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        {/* Category Filter */}
        <select className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none">
          <option>Category: All IT</option>
          <option>Hardware</option>
          <option>Software</option>
          <option>Access</option>
        </select>

        {/* Priority Filter */}
        <select className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none">
          <option>Priority: All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        {/* Assignee Filter */}
        <select className="bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md focus:ring-2 focus:ring-primary focus:border-primary min-w-40 outline-none">
          <option>Assignee: Anyone</option>
          <option>Me</option>
          <option>Unassigned</option>
        </select>
      </div>
    </div>
  );
}
