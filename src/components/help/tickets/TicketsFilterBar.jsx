import React from "react";
import { MdSearch } from "react-icons/md";
import CustomDropdown from "../../shared/CustomDropdown";

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
          <CustomDropdown
            value={statusFilter}
            onChange={onStatusFilter}
            placeholder="All Statuses"
            searchable={false}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "Open", label: "Open" },
              { value: "InProgress", label: "In Progress" },
              { value: "Resolved", label: "Resolved" },
              { value: "Closed", label: "Closed" },
            ]}
          />
        </div>

        {/* Priority Dropdown */}
        <div className="flex flex-col">
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-xs"
            htmlFor="filter-priority"
          >
            Priority
          </label>
          <CustomDropdown
            value={priorityFilter}
            onChange={onPriorityFilter}
            placeholder="All Priorities"
            searchable={false}
            options={[
              { value: "all", label: "All Priorities" },
              { value: "Critical", label: "Critical" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
