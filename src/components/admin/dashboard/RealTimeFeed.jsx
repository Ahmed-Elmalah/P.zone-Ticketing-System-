import React from "react";
import { useNavigate } from "react-router-dom";

export default function RealTimeFeed({ tickets = [], isLoading }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mt-2xl">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">
          Real-time Feed
        </h2>
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-xl animate-pulse">
          <div className="h-4 bg-surface-container-high rounded w-full mb-4"></div>
          <div className="h-4 bg-surface-container-high rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-surface-container-high rounded w-1/2 mb-4"></div>
        </div>
      </div>
    );
  }

  // Fallback if empty array provided
  const feed = tickets.length > 0 ? tickets.map(t => ({
    rawId: t.documentId || t.id,
    id: `#${(t.documentId || t.id).substring(0, 8).toUpperCase()}`,
    issue: t.subject,
    agent: t.assignee?.username || "Unassigned",
    status: t.state || "Open",
    badge: t.state === "Open" ? "bg-surface-container-high text-on-surface-variant" : 
           (t.state === "In Progress" || t.state === "Pending") ? "bg-primary-container/50 text-primary" : 
           "bg-secondary-container/30 text-secondary",
    time: new Date(t.createdAt).toLocaleDateString()
  })) : [];

  return (
    <div className="mt-2xl">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">
        Recent Activity
      </h2>
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-x-auto">
        <table className="w-full text-left min-w-200">
          <thead className="bg-surface-container-low">
            <tr>
              {["Ticket ID", "Issue", "Agent", "Status", "Date"].map(
                (head, i) => (
                  <th
                    key={i}
                    className="px-xl py-md font-label-md text-label-md text-outline uppercase"
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {feed.slice(0, 5).map((row, idx) => (
              <tr
                key={idx}
                onClick={() => navigate(`/admin/tickets/${row.rawId}`)}
                className="hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <td className="px-xl py-lg font-button-text text-primary">
                  {row.id}
                </td>
                <td className="px-xl py-lg font-body-md text-on-surface">
                  {row.issue}
                </td>
                <td className="px-xl py-lg font-body-md text-on-surface">
                  {row.agent}
                </td>
                <td className="px-xl py-lg">
                  <span
                    className={`px-md py-xs rounded-full text-label-md font-label-md ${row.badge}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-xl py-lg text-label-md text-outline">
                  {row.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
