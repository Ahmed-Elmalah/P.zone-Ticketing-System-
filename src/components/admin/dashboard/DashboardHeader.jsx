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

        
      </div>
    </>
  );
}
