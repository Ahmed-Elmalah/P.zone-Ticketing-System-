import React from "react";
import useAdminStore from "../../../store/useAdminStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CategoryChart() {
  const { categoryStats = [], isLoadingDashboard } = useAdminStore();

  const maxVal = Math.max(...categoryStats.map((s) => s.value), 0);
  
  // Calculate a nice rounded maximum for the Y-axis grid
  const getNiceMax = (val) => {
    if (val === 0) return 5;
    if (val <= 5) return 5;
    if (val <= 10) return 10;
    if (val <= 255) {
      return Math.ceil(val / 10) * 10;
    }
    return Math.ceil(val / 50) * 50;
  };
  
  const niceMax = getNiceMax(maxVal);
  
  const gridLines = [
    niceMax,
    Math.round(niceMax * 0.8),
    Math.round(niceMax * 0.6),
    Math.round(niceMax * 0.4),
    Math.round(niceMax * 0.2),
  ];

  // Map category stats to bars with calculated heights
  const bars = categoryStats.map((cat) => {
    const heightPercent = niceMax > 0 ? (cat.value / niceMax) * 85 : 0; // Cap at 85% for layout padding
    return {
      label: cat.label || "General",
      height: `${Math.max(heightPercent, 5)}%`, // Minimum 5% height so empty bars are slightly visible
      value: cat.value,
    };
  });

  return (
    <div className="xl:col-span-2 bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant flex flex-col min-h-[450px]">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-xl">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Tickets by IT Category
          </h2>
          <p className="font-body-md text-body-md text-outline">
            Volume distribution across technical departments
          </p>
        </div>
      </div>

      {isLoadingDashboard ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-md">
          <AiOutlineLoading3Quarters size={32} className="animate-spin text-primary" />
          <p className="text-body-md text-outline">Loading category statistics...</p>
        </div>
      ) : bars.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-body-md text-outline italic">No category data found</p>
        </div>
      ) : (
        /* Chart Canvas */
        <div className="relative h-90 w-full flex items-end justify-between gap-lg pt-2xl pb-xl border-b border-outline-variant mt-auto">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-xl pt-2xl">
            {gridLines.map((val, i) => (
              <div
                key={i}
                className="w-full border-t border-outline-variant/30 relative"
              >
                <span className="absolute -left-8 -top-2 text-label-md text-outline w-6 text-right">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Bars */}
          {bars.map((bar, idx) => (
            <div
              key={idx}
              className="group relative flex-1 bg-primary/10 rounded-t-lg transition-all hover:bg-primary/20 flex items-end justify-center cursor-help"
              style={{ height: bar.height }}
            >
              <div className="w-2/3 bg-primary rounded-t-lg h-full relative">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-3 py-1 rounded text-label-md whitespace-nowrap transition-opacity shadow-lg z-20">
                  {bar.value} Tickets
                </div>
              </div>
              <span className="absolute -bottom-8 text-label-md font-label-md text-on-surface-variant max-w-[80px] truncate text-center" title={bar.label}>
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
