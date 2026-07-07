import React from "react";
import { MdSearch } from "react-icons/md";

export default function TicketsFilterBar({
  search, onSearch,
  statusFilter, onStatusFilter,
  priorityFilter, onPriorityFilter
}) {
  return (
    <div className="flex flex-col md:flex-row gap-lg items-end bg-surface-container-lowest p-md md:p-lg rounded-xl shadow-sm border border-outline-variant">
      {/* Search Input Control */}
      <div className="w-full md:flex-1 relative">
        <label
          className="block font-label-md text-label-md text-on-surface-variant mb-xs"
          htmlFor="search-tickets"
        >
          Search
        </label>
        <div className="relative">
          <MdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            size={20}
          />
          <input
            className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-10 pr-4 text-body-md font-body-md text-on-surface focus:ring-2 focus:ring-primary placeholder-on-surface-variant outline-none"
            id="search-tickets"
            placeholder="Search by ID, Subject, or Requester..."
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Dropdowns Group */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-md">
        {/* Status Dropdown */}
        <div className="flex flex-col">
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-xs"
            htmlFor="filter-status"
          >
            Status
          </label>
          <select
            className="bg-surface-container-low border-none rounded-lg py-3 pl-4 pr-10 text-body-md font-body-md text-on-surface focus:ring-2 focus:ring-primary cursor-pointer min-w-40 outline-none"
            id="filter-status"
            value={statusFilter}
            onChange={(e) => onStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="flex flex-col">
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-xs"
            htmlFor="filter-priority"
          >
            Priority
          </label>
          <select
            className="bg-surface-container-low border-none rounded-lg py-3 pl-4 pr-10 text-body-md font-body-md text-on-surface focus:ring-2 focus:ring-primary cursor-pointer min-w-40 outline-none"
            id="filter-priority"
            value={priorityFilter}
            onChange={(e) => onPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>
    </div>
  );
}
