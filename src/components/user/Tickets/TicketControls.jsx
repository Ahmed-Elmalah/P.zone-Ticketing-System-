import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";

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
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilter(e.target.value)}
            className="bg-surface-bright border border-outline-variant text-on-surface-variant font-body-md text-body-md
              rounded-lg px-md py-sm pr-xl focus:outline-none focus:ring-2 focus:ring-primary-container
              appearance-none cursor-pointer"
          >
            <option value="">Status: All</option>
            <option value="Open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          <MdExpandMore className="absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
        </div>

        {/* Category Filter — dynamic from Strapi */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilter(e.target.value)}
            className="bg-surface-bright border border-outline-variant text-on-surface-variant font-body-md text-body-md
              rounded-lg px-md py-sm pr-xl focus:outline-none focus:ring-2 focus:ring-primary-container
              appearance-none cursor-pointer"
          >
            <option value="">Category: All</option>
            {categories.map((cat) => (
              <option key={cat.documentId || cat.id} value={cat.documentId || cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <MdExpandMore className="absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortBy(e.target.value)}
            className="bg-surface-bright border border-outline-variant text-on-surface-variant font-body-md text-body-md
              rounded-lg px-md py-sm pr-xl focus:outline-none focus:ring-2 focus:ring-primary-container
              appearance-none cursor-pointer"
          >
            <option value="createdAt:desc">Sort: Newest</option>
            <option value="createdAt:asc">Sort: Oldest</option>
            <option value="priority:desc">Sort: Priority</option>
            <option value="status:asc">Sort: Status</option>
          </select>
          <MdExpandMore className="absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
        </div>
      </div>
    </section>
  );
};

export default TicketControls;
