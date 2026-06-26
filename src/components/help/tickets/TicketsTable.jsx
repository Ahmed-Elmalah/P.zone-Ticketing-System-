import React from "react";
import TicketsTableRow from "./TicketsTableRow";
import TicketsTablePagination from "./TicketsTablePagination";

// Mock data
const ticketsData = [
  {
    id: "#IT-402",
    subject: "Laptop won't boot, showing blue screen",
    requester: "Sarah Jenkins",
    status: "Open",
    statusBadge: "bg-surface-variant text-on-surface-variant",
    priority: "High",
    priorityBadge: "bg-error-container text-on-error-container",
    sideIndicator: "bg-error",
    lastUpdated: "2 mins ago",
  },
  {
    id: "#IT-405",
    subject: "Cannot connect to office VPN from home",
    requester: "David Chen",
    status: "In Progress",
    statusBadge: "bg-primary-fixed text-on-primary-fixed",
    priority: "Medium",
    priorityBadge: "bg-tertiary-fixed text-on-tertiary-fixed",
    sideIndicator: "bg-tertiary",
    lastUpdated: "45 mins ago",
  },
  {
    id: "#IT-412",
    subject: "Requesting Adobe Creative Cloud license",
    requester: "Maria Garcia",
    status: "Pending",
    statusBadge: "bg-surface-variant text-on-surface-variant",
    priority: "Low",
    priorityBadge: "bg-surface-container-high text-on-surface",
    sideIndicator: "bg-outline",
    lastUpdated: "2 hours ago",
  },
  {
    id: "#IT-415",
    subject: "Database server unresponsive in production",
    requester: "Alex Mercer",
    status: "In Progress",
    statusBadge: "bg-primary-fixed text-on-primary-fixed",
    priority: "High",
    priorityBadge: "bg-error-container text-on-error-container",
    sideIndicator: "bg-error",
    lastUpdated: "1 day ago",
  },
];

export default function TicketsTable() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant overflow-hidden">
      {/* ── Data Grid Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="w-1"></th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider whitespace-nowrap">
                Ticket ID
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider whitespace-nowrap">
                Subject
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider whitespace-nowrap">
                Requester
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider whitespace-nowrap">
                Priority
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider whitespace-nowrap text-right">
                Last Updated
              </th>
              <th className="w-12 p-md"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {ticketsData.map((ticket, idx) => (
              <TicketsTableRow key={idx} ticket={ticket} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Table Pagination Footer ── */}
      <TicketsTablePagination totalItems={124} />
    </div>
  );
}
