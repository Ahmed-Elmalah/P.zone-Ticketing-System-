import React from "react";
import { MdConfirmationNumber } from "react-icons/md";

export default function NewTicketHeader() {
  return (
    <header className="px-xl py-lg border-b border-outline-variant bg-surface-bright/50">
      {/* System Tag */}
      <div className="flex items-center gap-sm text-primary mb-2">
        <MdConfirmationNumber size={20} />
        <span className="font-label-md text-label-md uppercase tracking-widest">
          IT Internal System
        </span>
      </div>

      {/* Main Titles */}
      <h1 className="font-headline-lg text-on-surface">
        New IT Ticket{" "}
        <span className="text-on-surface-variant font-normal">
          (Agent View)
        </span>
      </h1>
      <p className="font-body-lg text-on-surface-variant mt-1">
        Create and assign a technical support request on behalf of an employee.
      </p>
    </header>
  );
}
