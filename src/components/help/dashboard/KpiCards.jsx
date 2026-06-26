import React from "react";
import { MdInbox, MdWarning, MdTaskAlt } from "react-icons/md";

// Dummy data for KPIs to keep the JSX clean
const kpiData = [
  {
    id: 1,
    title: "My Open Tickets",
    value: "12",
    icon: MdInbox,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
  },
  {
    id: 2,
    title: "Unassigned IT Tickets",
    value: "34",
    icon: MdWarning,
    iconBg: "bg-error-container",
    iconColor: "text-on-error-container",
  },
  {
    id: 3,
    title: "Resolved Today",
    value: "45",
    icon: MdTaskAlt,
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
  },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-container-high flex items-center justify-between"
        >
          {/* Text Info */}
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-xs">
              {kpi.title}
            </p>
            <p className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              {kpi.value}
            </p>
          </div>

          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full ${kpi.iconBg} flex items-center justify-center ${kpi.iconColor}`}
          >
            <kpi.icon size={24} />
          </div>
        </div>
      ))}
    </div>
  );
}
