import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";
import CustomDropdown from "../../shared/CustomDropdown";

export default function TicketQueueToolbar({ sortBy, onSortChange }) {
  const [internalSort, setInternalSort] = useState("time");

  const currentSort = sortBy || internalSort;
  const handleChange = onSortChange || setInternalSort;

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
        <CustomDropdown
          value={currentSort}
          onChange={handleChange}
          searchable={false}
          options={[
            { value: "time", label: "Time in Queue" },
            { value: "priority", label: "Priority" },
            { value: "id", label: "Ticket ID" },
          ]}
        />
      </div>
    </div>
  );
}