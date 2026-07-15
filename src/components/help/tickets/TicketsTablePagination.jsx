import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function TicketsTablePagination({ pagination, onPageChange }) {
  if (!pagination || pagination.pageCount <= 1) return null;

  const { page, pageCount, total, pageSize } = pagination;
  
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  // Generate page numbers to display
  // Simple logic: show first, current-1, current, current+1, last, and ellipses
  const getPageNumbers = () => {
    const pages = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(pageCount);
      } else if (page >= pageCount - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = pageCount - 4; i <= pageCount; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(pageCount);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-md border-t border-outline-variant bg-surface-container-lowest gap-sm">
      <span className="font-body-md text-body-md text-on-surface-variant">
        Showing {startItem}-{endItem} of {total} tickets
      </span>

      <div className="flex items-center gap-xs">
        <button
          className="p-2 rounded-md border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => onPageChange && onPageChange(page - 1)}
        >
          <MdChevronLeft size={18} />
        </button>

        {getPageNumbers().map((p, idx) => (
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="text-on-surface-variant px-1">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange && onPageChange(p)}
              className={`w-8 h-8 rounded-md font-body-md text-body-md flex items-center justify-center transition-colors ${
                p === page
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-low text-on-surface"
              }`}
            >
              {p}
            </button>
          )
        ))}

        <button 
          className="p-2 rounded-md border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === pageCount}
          onClick={() => onPageChange && onPageChange(page + 1)}
        >
          <MdChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
