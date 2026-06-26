import React from "react";
import { MdCalendarToday, MdDownload } from "react-icons/md";

export default function DashboardHeader() {
  return (
    <>
      {/* Page Header container with custom md/xl spacing */}
      <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Analytics Performance
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
            Reviewing system-wide IT efficiency and agent productivity metrics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-sm">
          <button className="flex items-center gap-sm px-lg py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-button-text text-button-text text-on-surface hover:bg-surface-container-low transition-all">
            <MdCalendarToday size={18} className="text-on-surface-variant" />
            <span>Last 30 Days</span>
          </button>

          <button className="flex items-center gap-sm px-lg py-sm bg-primary text-on-primary rounded-lg font-button-text text-button-text hover:opacity-90 transition-all shadow-sm">
            <MdDownload size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </>
  );
}
