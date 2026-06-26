import React from "react";

export default function TicketsPagination({ totalTickets }) {
  return (
    <div className="p-md border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
      {/* Showing items count */}
      <span className="font-body-md text-on-surface-variant text-sm">
        Showing 1 to {totalTickets} of 156 tickets
      </span>

      {/* Pagination Controls */}
      <div className="flex gap-sm">
        <button
          className="px-3 py-1 border border-outline-variant rounded text-sm text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 transition-colors"
          disabled
        >
          Previous
        </button>
        <button className="px-3 py-1 border border-outline-variant rounded text-sm text-on-surface hover:bg-surface-container-low transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}
