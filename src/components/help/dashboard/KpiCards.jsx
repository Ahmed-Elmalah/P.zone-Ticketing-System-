import React from "react";
import { MdInbox, MdAssignmentInd, MdWarning } from "react-icons/md";

export default function KpiCards({ stats = { unassigned: 0, mine: 0, urgent: 0 }, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-lg rounded-2xl flex items-center justify-between shadow-sm border border-outline-variant/30 bg-surface-container-low animate-pulse">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-surface-container-high rounded"></div>
              <div className="h-8 w-12 bg-surface-container-high rounded"></div>
            </div>
            <div className="h-12 w-12 bg-surface-container-high rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      id: "unassigned",
      label: "Unassigned Queue",
      value: stats.unassigned,
      icon: MdInbox,
      colorClass: "bg-surface-container-low text-on-surface",
      iconColor: "text-primary",
    },
    {
      id: "mine",
      label: "My Active Tickets",
      value: stats.mine,
      icon: MdAssignmentInd,
      colorClass: "bg-primary-container text-on-primary-container",
      iconColor: "text-primary",
    },
    {
      id: "urgent",
      label: "Urgent & Critical",
      value: stats.urgent,
      icon: MdWarning,
      colorClass: stats.urgent > 0 ? "bg-error-container text-on-error-container" : "bg-surface-container-low text-on-surface-variant",
      iconColor: stats.urgent > 0 ? "text-error" : "text-on-surface-variant",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`p-lg rounded-2xl flex items-center justify-between shadow-sm border border-outline-variant/30 transition-transform hover:-translate-y-1 ${card.colorClass}`}
        >
          <div className="flex flex-col gap-1">
            <span className="font-label-lg text-label-lg uppercase tracking-wide opacity-80">
              {card.label}
            </span>
            <span className="font-display-lg text-display-lg font-bold">
              {card.value}
            </span>
          </div>
          <div className={`p-md rounded-full bg-surface/50 ${card.iconColor}`}>
            <card.icon size={32} />
          </div>
        </div>
      ))}
    </div>
  );
}
