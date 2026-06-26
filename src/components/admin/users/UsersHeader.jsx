import React from "react";
import { MdFilterList, MdDownload } from "react-icons/md";

export default function UsersHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
      
      {/* ── Page Title & Description ── */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Organization Users
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Manage system access, roles, and user statuses.
        </p>
      </div>
      
      {/* ── Action Buttons ── */}
      <div className="flex gap-sm">
        <button className="flex items-center gap-xs px-md py-2 border border-outline-variant rounded-lg font-button-text text-on-surface hover:bg-surface-container transition-colors bg-surface-container-lowest shadow-sm">
          <MdFilterList size={18} />
          Filter
        </button>
        <button className="flex items-center gap-xs px-md py-2 border border-outline-variant rounded-lg font-button-text text-on-surface hover:bg-surface-container transition-colors bg-surface-container-lowest shadow-sm">
          <MdDownload size={18} />
          Export
        </button>
      </div>

    </div>
  );
}