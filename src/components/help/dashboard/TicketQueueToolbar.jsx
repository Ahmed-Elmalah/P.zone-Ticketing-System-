import React from "react";
import { MdFilterList } from "react-icons/md";

export default function TicketQueueToolbar() {
  return (
    <div className="p-md border-b border-surface-container-high flex justify-between items-center bg-surface-bright">
      {/* Filter Button */}
      <div className="flex items-center gap-sm">
        <button className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded transition-colors">
          <MdFilterList size={20} />
        </button>
        <span className="font-body-md text-body-md text-on-surface-variant">
          Filter
        </span>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-sm">
        <span className="font-body-md text-body-md text-on-surface-variant mr-2">
          Sort by:
        </span>
        <select className="bg-transparent font-label-md text-label-md text-on-surface border-none focus:ring-0 p-0 cursor-pointer outline-none">
          <option>Time in Queue</option>
          <option>Priority</option>
          <option>Ticket ID</option>
        </select>
      </div>
    </div>
  );
}