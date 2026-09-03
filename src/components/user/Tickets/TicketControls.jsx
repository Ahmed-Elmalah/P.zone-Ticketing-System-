import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import CustomDropdown from "../../shared/CustomDropdown";

// Controlled search + filter controls — receives state and handlers from parent (Tickets.jsx)
const TicketControls = ({
  search, onSearch,
  statusFilter, onStatusFilter,
  categoryFilter, onCategoryFilter,
  sortBy, onSortBy,
  categories = [],
}) => {
  return (
    <section className="flex flex-col lg:flex-row gap-md bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant items-center justify-between">
      
      {/* Search Input */}
      <div className="w-full lg:w-96 relative">
        <IoSearchOutline className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          className="w-full pl-xl pr-md py-sm bg-surface-bright border border-outline-variant rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent
            font-body-md text-body-md transition-shadow"
          placeholder="Search tickets..."
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-md w-full lg:w-auto">
        
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

        {/* Category Filter — dynamic from Strapi */}
        <CustomDropdown
          value={categoryFilter}
          onChange={onCategoryFilter}
          placeholder="Category: All"
          searchable={true}
          options={[
            { value: "", label: "Category: All" },
            ...categories.map((cat) => ({
              value: cat.documentId || cat.id,
              label: cat.name,
            })),
          ]}
        />

        {/* Sort */}
        <CustomDropdown
          value={sortBy}
          onChange={onSortBy}
          placeholder="Sort: Newest"
          searchable={false}
          options={[
            { value: "createdAt:desc", label: "Sort: Newest" },
            { value: "createdAt:asc", label: "Sort: Oldest" },
            { value: "priority:desc", label: "Sort: Priority" },
            { value: "status:asc", label: "Sort: Status" },
          ]}
        />
      </div>
    </section>
  );
};

export default TicketControls;
