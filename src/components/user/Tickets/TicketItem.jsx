import React from "react";

// Status color mapping — matches Strapi enum values exactly
const statusStyles = {
  Open: {
    badge: "bg-secondary-container text-on-secondary-container",
    dot: "bg-secondary",
  },
  InProgress: {
    badge: "bg-[#e3f2fd] text-[#1565c0]",
    dot: "bg-[#1976d2]",
  },
  Resolved: {
    badge: "bg-[#e8f5e9] text-[#2e7d32]",
    dot: "bg-[#43a047]",
  },
  Closed: {
    badge: "bg-surface-container-high text-on-surface-variant",
    dot: "bg-outline",
  },
};

const TicketItem = ({ id, subject, category, date, status }) => {
  // Get the current styles based on the ticket status, default to 'Open' if not found
  const currentStyle = statusStyles[status] || statusStyles.Open;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-sm md:gap-md px-md md:px-lg py-md border-b border-outline-variant hover:bg-surface-container transition-colors items-center cursor-pointer group">
      {/* Ticket ID */}
      <div className="col-span-1 md:col-span-2 font-body-md text-body-md text-outline">
        {id}
      </div>

      {/* Subject */}
      <div className="col-span-1 md:col-span-4 font-headline-md text-headline-md md:font-body-md md:text-body-md font-bold text-on-surface group-hover:text-primary transition-colors">
        {subject}
      </div>

      {/* Category */}
      <div className="col-span-1 md:col-span-2 font-body-md text-body-md text-on-surface-variant">
        {category}
      </div>

      {/* Date */}
      <div className="col-span-1 md:col-span-2 font-body-md text-body-md text-on-surface-variant">
        {date}
      </div>

      {/* Status Badge */}
      <div className="col-span-1 md:col-span-2 flex">
        <span
          className={`inline-flex items-center px-sm py-xs rounded-full text-label-md font-label-md ${currentStyle.badge}`}
        >
          <span
            className={`w-2 h-2 rounded-full mr-xs ${currentStyle.dot}`}
          ></span>
          {status}
        </span>
      </div>
    </div>
  );
};

export default TicketItem;
