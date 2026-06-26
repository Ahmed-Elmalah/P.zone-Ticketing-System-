import React from "react";

export default function TicketsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-md">
      {/* Title & Description */}
      <div className="flex flex-col gap-sm">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
          All IT Tickets
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          View and manage all active IT support requests.
        </p>
      </div>
    </div>
  );
}
