import React from 'react';
import { MdLink, MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function QuickActions({ quickActions = [] }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-md">
      <h3 className="font-black tracking-tight text-on-surface ml-1 text-xl">
       Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 gap-sm">
        {/* Main "New Ticket" button */}
        <button
          onClick={() => navigate("/user/tickets/new")}
          className="w-full bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] text-white py-3 px-md rounded-xl
            font-extrabold hover:brightness-110
            transition-all hover:-translate-y-1 shadow-[0_2px_8px_rgba(79,70,229,0.25)] flex items-center justify-center gap-sm mb-sm"
        >
          <MdEditNote size={22} />
          Create New Ticket
        </button>

        {/* Dynamic Quick Actions */}
        {quickActions.map((action) => (
          <a
            key={action.documentId || action.id}
            href={action.url}
            target="_blank"
            rel="noreferrer"
            className="w-full glass-card text-on-surface border border-outline-variant p-md rounded-2xl flex items-center gap-md transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30 group"
          >
            <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:scale-110 transition-transform">
              <MdLink size={24} />
            </div>
            <span className="font-label-md text-label-md text-left flex-1 font-medium">{action.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
