import React from "react";
import TicketsTableRow from "./TicketsTableRow";
import TicketsTablePagination from "./TicketsTablePagination";

export default function TicketsTable({ tickets, isLoading, activeTab, onAssignMe, pagination }) {
  const showAssignButton = activeTab === "unassigned";

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant overflow-hidden flex flex-col">
      {/* ── Data Grid Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
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
              <th className="w-32 p-md"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-xl text-center text-on-surface-variant">
                  Loading tickets...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-xl text-center text-on-surface-variant">
                  No tickets found in this queue.
                </td>
              </tr>
            ) : (
              tickets.map((ticket, idx) => (
                <TicketsTableRow 
                  key={ticket.documentId || ticket.id || idx} 
                  ticket={ticket} 
                  showAssignButton={showAssignButton}
                  onAssign={onAssignMe}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Table Pagination Footer ── */}
      {pagination && pagination.pageCount > 1 && (
        <TicketsTablePagination totalItems={pagination.total} />
      )}
    </div>
  );
}
