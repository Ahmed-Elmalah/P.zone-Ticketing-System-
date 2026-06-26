import React from "react";
import { MdAdd } from "react-icons/md";

export default function DashboardHeader() {
  return (
    <div className="mb-xl flex justify-between items-end">
      {/* Title and Description */}
      <div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
          Ticket Queue
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Manage and prioritize IT support requests.
        </p>
      </div>

      {/* Mobile Add Button - Only visible on small screens */}
      <button className="md:hidden bg-primary text-on-primary p-sm rounded-full shadow-sm active:scale-95">
        <MdAdd size={24} />
      </button>
    </div>
  );
}