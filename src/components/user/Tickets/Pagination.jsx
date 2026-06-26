import React from "react";

// Reusable Pagination Component
const Pagination = () => {
  return (
    <div className="flex items-center justify-between px-lg py-md bg-surface-bright border-t border-outline-variant">
      <button className="px-md py-sm border border-outline-variant rounded-lg font-button-text text-button-text text-on-surface-variant hover:bg-surface-container transition-colors focus:ring-2 focus:ring-primary-container">
        Previous
      </button>
      <div className="hidden md:flex items-center gap-xs">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-container text-on-primary font-button-text text-button-text">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant font-button-text text-button-text transition-colors">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant font-button-text text-button-text transition-colors">
          3
        </button>
        <span className="text-on-surface-variant">...</span>
      </div>
      <button className="px-md py-sm border border-outline-variant rounded-lg font-button-text text-button-text text-on-surface-variant hover:bg-surface-container transition-colors focus:ring-2 focus:ring-primary-container">
        Next
      </button>
    </div>
  );
};

export default Pagination;
