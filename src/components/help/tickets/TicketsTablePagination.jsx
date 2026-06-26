import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function TicketsTablePagination({ totalItems }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-md border-t border-outline-variant bg-surface-container-lowest gap-sm">
      <span className="font-body-md text-body-md text-on-surface-variant">
        Showing 1-10 of {totalItems} tickets
      </span>

      <div className="flex items-center gap-xs">
        <button
          className="p-2 rounded-md border border-outline-variant text-outline disabled:opacity-50 hover:bg-surface-container-low transition-colors"
          disabled
        >
          <MdChevronLeft size={18} />
        </button>

        <button className="w-8 h-8 rounded-md bg-primary text-on-primary font-body-md text-body-md flex items-center justify-center">
          1
        </button>
        <button className="w-8 h-8 rounded-md hover:bg-surface-container-low text-on-surface font-body-md text-body-md flex items-center justify-center transition-colors">
          2
        </button>
        <button className="w-8 h-8 rounded-md hover:bg-surface-container-low text-on-surface font-body-md text-body-md flex items-center justify-center transition-colors">
          3
        </button>

        <span className="text-on-surface-variant px-1">...</span>
        <button className="w-8 h-8 rounded-md hover:bg-surface-container-low text-on-surface font-body-md text-body-md flex items-center justify-center transition-colors">
          13
        </button>

        <button className="p-2 rounded-md border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors">
          <MdChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
