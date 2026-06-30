import React from 'react';
import { MdStorage, MdWifiOff, MdLaptopMac, MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: "Share Server is not working", icon: MdStorage },
    { label: "Internet is down", icon: MdWifiOff },
    { label: "Request New Hardware", icon: MdLaptopMac },
  ];

  return (
    <div className="flex flex-col gap-md">
      <h3 className="font-headline-md text-headline-md text-on-surface ml-1">
       Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 gap-sm">
        {/* Main "New Ticket" button */}
        <button
          onClick={() => navigate("/user/tickets/new")}
          className="w-full bg-primary text-on-primary py-3 px-md rounded-xl
            font-button-text text-button-text hover:bg-on-primary-fixed-variant
            transition-all hover:-translate-y-1 hover:shadow-md flex items-center justify-center gap-sm shadow-sm mb-sm"
        >
          <MdEditNote size={22} />
          Create New Ticket
        </button>

        {/* Placeholder Quick Actions */}
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="w-full bg-surface-container-lowest text-on-surface border border-outline-variant p-md rounded-xl flex items-center gap-md transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/50 group"
          >
            <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:scale-110 transition-transform">
              <action.icon size={24} />
            </div>
            <span className="font-label-md text-label-md text-left flex-1 font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
