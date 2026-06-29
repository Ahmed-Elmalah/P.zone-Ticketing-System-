import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Pagination — only renders if totalPages > 1
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Build page numbers array
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between px-lg py-md bg-surface-bright border-t border-outline-variant">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg
          font-button-text text-button-text text-on-surface-variant
          hover:bg-surface-container transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MdChevronLeft size={18} />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="hidden md:flex items-center gap-xs">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg
              font-button-text text-button-text transition-colors
              ${p === currentPage
                ? "bg-primary text-on-primary"
                : "hover:bg-surface-container text-on-surface-variant"
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Mobile page indicator */}
      <span className="md:hidden text-on-surface-variant font-body-md text-body-md">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg
          font-button-text text-button-text text-on-surface-variant
          hover:bg-surface-container transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <MdChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
