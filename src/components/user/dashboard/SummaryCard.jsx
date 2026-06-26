// ============================================================
// SummaryCard.jsx
// Reusable stat card for the dashboard.
//
// Props:
//   label       - card title (e.g. "My Open Tickets")
//   count       - big number to display
//   icon        - react-icon component
//   accentColor - "primary" | "secondary"  (controls left bar + icon color)
//   trend       - trend text (e.g. "+3 since yesterday")
//   trendUp     - true = good (green), false = bad (red)
// ============================================================

import { MdTrendingUp } from "react-icons/md";

// Color maps for primary vs secondary variant
const colorMap = {
  primary: {
    bar: "bg-primary",
    iconBg: "bg-primary-container",
    iconText: "text-primary-container",
    trendText: "text-error", // open tickets trending up = bad
  },
  secondary: {
    bar: "bg-secondary",
    iconBg: "bg-secondary-container",
    iconText: "text-secondary",
    trendText: "text-secondary", // resolved trending up = good
  },
};

export default function SummaryCard({
  label = "Tickets",
  count = 0,
  icon: Icon,
  accentColor = "primary",
  trend = "",
  trendUp = true,
}) {
  const colors = colorMap[accentColor] || colorMap.primary;

  return (
    <div
      className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant
      p-lg relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bar}`} />

      {/* Top row: label + icon */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">
            {label}
          </p>
          <h2 className="text-4xl font-bold text-on-surface font-headline-md tracking-tight">
            {count}
          </h2>
        </div>

        {/* Icon circle */}
        <div
          className={`h-10 w-10 rounded-full ${colors.iconBg} bg-opacity-20 flex items-center
          justify-center ${colors.iconText} group-hover:scale-110 transition-transform`}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {/* Trend row */}
      {trend && (
        <p
          className={`font-body-md text-body-md mt-md flex items-center gap-xs ${
            trendUp ? colors.trendText : "text-error"
          }`}
        >
          <MdTrendingUp size={16} />
          <span>{trend}</span>
        </p>
      )}
    </div>
  );
}
