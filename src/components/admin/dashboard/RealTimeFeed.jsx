import React from "react";

export default function RealTimeFeed() {
  const feed = [
    {
      id: "#INC-9402",
      issue: "Database latency on production nodes",
      agent: "Maria G.",
      status: "Resolved",
      badge: "bg-secondary-container/30 text-secondary",
      time: "14 mins ago",
    },
    {
      id: "#INC-9398",
      issue: "VPN Access failure - Seattle Office",
      agent: "Sarah J.",
      status: "In Progress",
      badge: "bg-primary-container/20 text-primary",
      time: "32 mins ago",
    },
    {
      id: "#INC-9395",
      issue: "New hire workstation setup (HR)",
      agent: "Alex M.",
      status: "Open",
      badge: "bg-surface-container-high text-on-surface-variant",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="mt-2xl">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">
        Real-time Feed
      </h2>
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-x-auto">
        <table className="w-full text-left min-w-200">
          <thead className="bg-surface-container-low">
            <tr>
              {["Ticket ID", "Issue", "Agent", "Status", "Time"].map(
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
            {feed.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-surface-container-low/50 transition-colors"
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
