import React from "react";

export default function TicketSidebar() {
  return (
    <aside className="flex-3 min-w-75 border-l border-outline-variant bg-surface-container-lowest overflow-y-auto p-margin-desktop flex flex-col gap-lg shadow-sm z-10">
      <h2 className="font-headline-md text-headline-md text-on-surface">
        Ticket Properties
      </h2>

      {/* Status Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Status
        </label>
        <select className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm">
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Priority Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Priority
        </label>
        <select className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Category
        </label>
        <select className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm">
          <option value="access">Access/Authentication</option>
          <option value="billing">Billing</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>

      {/* Assignee Dropdown */}
      <div className="flex flex-col gap-sm">
        <label className="font-label-md text-label-md text-on-surface-variant">
          Assignee
        </label>
        <select className="bg-surface border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm">
          <option value="david">David Chen (Tier 2)</option>
          <option value="unassigned">Unassigned</option>
          <option value="sarah">Sarah Jenkins (Tier 1)</option>
        </select>
      </div>

      {/* Save Button fixed at the bottom of sidebar */}
      <div className="mt-auto pt-lg border-t border-outline-variant">
        <button className="bg-primary text-on-primary font-button-text text-button-text py-2 px-md rounded-lg shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-all w-full flex justify-center items-center gap-xs">
          Save Changes
        </button>
      </div>
    </aside>
  );
}
