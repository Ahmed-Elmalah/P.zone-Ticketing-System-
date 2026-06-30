import React from "react";

export default function TicketsPagination({ page, setPage, totalPages, total, pageSize }) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="p-md border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
      {/* Showing items count */}
      <span className="font-body-md text-on-surface-variant text-sm">
        Showing {start} to {end} of {total} tickets
      </span>

      {/* Pagination Controls */}
      <div className="flex gap-sm">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border border-outline-variant rounded text-sm text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border border-outline-variant rounded text-sm text-on-surface hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
