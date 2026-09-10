import React from "react";
import TicketsRow from "./TicketsRow";
import TicketsPagination from "./TicketsPagination";

export default function TicketsGrid({ tickets = [], isLoading = false, pagination, page, setPage, pageSize }) {
  return (
    <div className="bg-surface rounded-2xl glass-card border border-outline-variant shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="rounded-2xl glass-card" className="w-full text-left border-collapse">
          {/* ── Table Header ── */}
          <thead className="bg-surface-container-low border-b border-outline-variant backdrop-blur-sm text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
            <tr>
              <th className="p-md text-[10px] bg-surface-container-low/50 text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
                ID
              </th>
              <th className="p-md text-[10px] bg-surface-container-low/50 text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
                Requester
              </th>
              <th className="p-md text-[10px] bg-surface-container-low/50 w-1/3 text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
                Subject
              </th>
              <th className="p-md text-[10px] bg-surface-container-low/50 text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
                Assignee
              </th>
              <th className="p-md text-[10px] bg-surface-container-low/50 text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
                Status
              </th>
              <th className="p-md text-[10px] bg-surface-container-low/50 text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
                Date
              </th>
              <th className="p-md text-[10px] bg-surface-container-low/50 text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low/50">
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
