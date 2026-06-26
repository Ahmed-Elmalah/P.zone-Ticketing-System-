import React from "react";
import TicketsRow from "./TicketsRow";
import TicketsPagination from "./TicketsPagination";

// Dummy data representing the tickets
const ticketsData = [
  {
    id: "#INC-9012",
    requester: "Sarah Connor",
    department: "FINANCE",
    subject:
      "Main database server is unreachable, affecting all financial reporting systems.",
    assigneeName: "John Doe",
    assigneeInitials: "JD",
    assigneeColor: "bg-primary-container text-on-primary-container",
    status: "Open",
    statusStyle: "bg-error-container text-on-error-container border-error/20",
    statusDot: "bg-error",
    rowStyle: "bg-error-container/20 hover:bg-error-container/30",
    date: "Oct 24, 09:15",
  },
  {
    id: "#REQ-8834",
    requester: "Mike Ross",
    department: "LEGAL",
    subject:
      "Urgent access request to confidential case files folder on shared drive.",
    assigneeName: "Anna Smith",
    assigneeInitials: "AS",
    assigneeColor: "bg-secondary-container text-on-secondary-container",
    status: "In Progress",
    statusStyle:
      "bg-surface-container-high text-on-surface border-outline-variant/50",
    statusDot: "bg-primary",
    rowStyle: "bg-tertiary-container/10 hover:bg-tertiary-container/20",
    date: "Oct 24, 10:30",
  },
  {
    id: "#INC-9011",
    requester: "Jim Halpert",
    department: "SALES",
    subject: "Printer on 3rd floor is jamming constantly. Needs maintenance.",
    assigneeName: null,
    status: "New",
    statusStyle:
      "bg-surface-container-low text-on-surface-variant border-outline-variant/30",
    statusDot: "bg-outline",
    rowStyle: "bg-surface hover:bg-surface-container-low",
    date: "Oct 24, 11:05",
  },
];

export default function TicketsGrid() {
  return (
    <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* ── Table Header ── */}
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="p-md w-12">
                <input
                  type="checkbox"
                  className="rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                />
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase">
                ID
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase">
                Requester
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase w-1/3">
                Subject
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase">
                Assignee
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase">
                Status
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase">
                Date
              </th>
              <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* ── Table Body ── */}
          <tbody className="divide-y divide-outline-variant/50">
            {ticketsData.map((ticket, index) => (
              <TicketsRow key={index} ticket={ticket} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <TicketsPagination totalTickets={ticketsData.length} />
    </div>
  );
}
