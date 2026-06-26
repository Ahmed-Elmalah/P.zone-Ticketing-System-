import React from "react";

export default function TicketQueueTabs() {
  return (
    <div className="border-b border-outline-variant px-lg pt-sm flex gap-xl overflow-x-auto no-scrollbar">
      <button className="font-label-md text-label-md text-primary border-b-2 border-primary pb-sm pt-sm whitespace-nowrap">
        My Queue
      </button>
      <button className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface pb-sm pt-sm whitespace-nowrap transition-colors">
        Unassigned{" "}
        <span className="bg-surface-container-high text-on-surface px-2 py-0.5 rounded-full ml-1">
          34
        </span>
      </button>
      <button className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface pb-sm pt-sm whitespace-nowrap transition-colors">
        Urgent{" "}
        <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded-full ml-1">
          5
        </span>
      </button>
    </div>
  );
}