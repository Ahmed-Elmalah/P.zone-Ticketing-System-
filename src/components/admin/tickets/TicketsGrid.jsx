import React from "react";
import TicketsRow from "./TicketsRow";
import TicketsPagination from "./TicketsPagination";

export default function TicketsGrid({ tickets = [], isLoading = false, pagination, page, setPage, pageSize }) {
  return (
    <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* ── Table Header ── */}
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
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
                Priority
              </th>
            </tr>
          </thead>

          {/* ── Table Body ── */}
          <tbody className="divide-y divide-outline-variant/50">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="p-xl text-center text-on-surface-variant">
                  Loading tickets...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-xl text-center text-on-surface-variant">
                  No tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket, index) => (
                <TicketsRow key={ticket.id || index} ticket={ticket} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      {pagination && pagination.pageCount > 1 && (
        <TicketsPagination 
          page={page} 
          setPage={setPage} 
          totalPages={pagination.pageCount}
          total={pagination.total}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
