import React from "react";
import { MdSearch } from "react-icons/md";

// Fully responsive TopHeader with unified search bar height
export default function TopHeader({
  placeholder = "Search...",
  onSearch,
  actionButton,
}) {
  return (
    <header className="flex justify-between items-center h-16 px-sm sm:px-lg bg-surface border-b border-outline-variant sticky top-0 z-40 w-full gap-sm sm:gap-md ">
      {/* ── Left Section: Responsive Search Bar ── */}
      <div className="w-full max-w-115 flex-1 sm:flex-none">
        <div className="relative w-full">
          {/* Search Icon - Secured vertical centering */}
          <MdSearch
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            size={20}
          />

          {/* Search Input - Upgraded mobile height to match action button */}
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-full pl-9 sm:pl-11 pr-sm py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:bg-surface transition-all font-body-md text-body-md placeholder-on-surface-variant outline-none"
          />
        </div>
      </div>

      {/* ── Right Section: Action Button Slot ── */}
      <div className="flex items-center shrink-0">{actionButton}</div>
    </header>
  );
}
