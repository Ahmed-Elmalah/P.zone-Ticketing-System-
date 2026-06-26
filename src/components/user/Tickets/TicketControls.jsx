import React from "react";
import { IoSearchOutline } from "react-icons/io5";

// Component for search bar and dropdown filters
const TicketControls = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-md bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant items-center justify-between">
      {/* Search Input */}
      <div className="w-full lg:w-96 relative">
        <IoSearchOutline className="absolute left-sm top-1/2 -translate-y-1/2" />

        <input
          className="w-full pl-xl pr-md py-sm bg-surface-bright border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent font-body-md text-body-md transition-shadow"
          placeholder="Search tickets..."
          type="text"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-md w-full lg:w-auto">
        <select className="bg-surface-bright border border-outline-variant text-on-surface-variant font-body-md text-body-md rounded-lg px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer pr-xl relative">
          <option>Status: All</option>
          <option>Open</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
        <select className="bg-surface-bright border border-outline-variant text-on-surface-variant font-body-md text-body-md rounded-lg px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer pr-xl">
          <option>Category: All</option>
          <option>Technical</option>
          <option>Billing</option>
          <option>General</option>
        </select>
        <select className="bg-surface-bright border border-outline-variant text-on-surface-variant font-body-md text-body-md rounded-lg px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer pr-xl">
          <option>Sort by: Date</option>
          <option>Priority</option>
          <option>Status</option>
        </select>
      </div>
    </section>
  );
};

export default TicketControls;
