import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/user/Tickets/Pagination";

export default function RecentActivity({ tickets = [], isLoading, pagination, onPageChange }) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
        <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
          <div className="h-6 w-48 bg-surface-container-high rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-surface-container-high rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-md md:p-lg flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-outline-variant animate-pulse">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-sm">
                  <div className="h-4 w-16 bg-surface-container-high rounded"></div>
                  <div className="h-5 w-48 bg-surface-container-high rounded"></div>
                </div>
                <div className="flex gap-md mt-1">
                  <div className="h-3 w-24 bg-surface-container-high rounded"></div>
                  <div className="h-3 w-32 bg-surface-container-high rounded"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-surface-container-high rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
      <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
        <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">
          Queue Needs Attention (Unassigned)
        </h2>
        <Link to="/help/tickets" className="font-label-md text-primary hover:underline font-bold">
          View Full Queue
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="p-2xl text-center text-on-surface-variant font-body-lg">
          No tickets found. You're all caught up!
        </div>
      ) : (
        <div className="flex flex-col">
          {tickets.map((ticket, index) => (
            <Link
              key={ticket.id || ticket.documentId}
              to={`/help/tickets/${ticket.documentId || ticket.id}`}
              className={`p-md md:p-lg flex flex-col md:flex-row md:items-center justify-between gap-md transition-colors hover:bg-surface-container-low group cursor-pointer ${
                index !== tickets.length - 1 ? "border-b border-outline-variant" : ""
              }`}
            >
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-sm">
                  <span className="font-label-sm text-on-surface-variant uppercase tracking-widest bg-surface-container px-2 py-0.5 rounded">
                    #{ticket.documentId?.substring(0, 8).toUpperCase() || ticket.id}
                  </span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-1">
                    {ticket.subject}
                  </h3>
                </div>
                <div className="font-body-sm text-on-surface-variant flex gap-md mt-1">
                  <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                  <span>Creator: {ticket.creator?.username || 'Unknown'}</span>
                </div>
              </div>

              <div className="flex items-center gap-sm md:gap-md">
                <span
                  className={`px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${
                    ticket.priority === "Critical"
                      ? "bg-error text-on-error"
                      : ticket.priority === "High"
                      ? "bg-error-container text-on-error-container"
                      : ticket.priority === "Medium"
                      ? "bg-tertiary-container text-on-tertiary-container"
                      : "bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination wrapper matching TicketTable logic */}
      {pagination && pagination.pageCount > 1 && (
        <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pageCount}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
