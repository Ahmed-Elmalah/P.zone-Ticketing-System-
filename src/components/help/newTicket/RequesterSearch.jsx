import React from "react";
import { MdPersonSearch, MdExpandMore } from "react-icons/md";

export default function RequesterSearch() {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-xl p-lg space-y-xs transition-colors hover:bg-primary/8">
      {/* Label section */}
      <label
        className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider flex items-center gap-2"
        htmlFor="requester"
      >
        <MdPersonSearch size={20} />
        Requester / Employee
      </label>

      {/* Input wrapper with drop icon */}
      <div className="relative">
        <input
          className="w-full bg-surface-container-lowest rounded-lg border border-primary/30 px-md py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface font-body-lg placeholder:text-on-surface-variant/50"
          id="requester"
          name="requester"
          placeholder="Search by name, email or employee ID..."
          type="text"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
          <MdExpandMore size={24} />
        </div>
      </div>

      {/* Helper text */}
      <p className="text-[11px] text-on-surface-variant px-1 italic">
        Crucial: Ensure correct identity for historical SLA tracking.
      </p>
    </div>
  );
}
