import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TicketHeader from "../../components/user/Tickets/TicketHeader";
import TicketControls from "../../components/user/Tickets/TicketControls";
import TicketItem from "../../components/user/Tickets/TicketItem";
import Pagination from "../../components/user/Tickets/Pagination";
import useTicketStore from "../../store/useTicketStore";
import useAdminStore from "../../store/useAdminStore";
import { useAuthStore } from "../../auth/authStore";

const PAGE_SIZE = 10;

const Tickets = () => {
  const { tickets, fetchTickets, isLoading, pagination } = useTicketStore();
  const { categories, fetchCategories } = useAdminStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt:desc");
  const [page, setPage] = useState(1);

  // Build Strapi query params and fetch
  const loadTickets = useCallback(() => {
    if (!user?.id) return;

    const params = {
      pagination: { page, pageSize: PAGE_SIZE },
      sort: sortBy,
      populate: ["creator", "assignee", "category"],
      filters: {
        creator: { id: { $eq: user.id } }
      }
    };

    if (search) {
      params.filters = {
        ...params.filters,
        $or: [
          { subject: { $containsi: search } },
          { documentId: { $containsi: search } },
          { creator: { username: { $containsi: search } } },
          { creator: { employeeId: { $containsi: search } } }
        ]
      };
    }

    if (statusFilter) {
      params.filters = {
        ...params.filters,
        state: { $eq: statusFilter },
      };
    }

    if (categoryFilter) {
      const isNumeric = /^\d+$/.test(categoryFilter);
      params.filters = {
        ...params.filters,
        category: isNumeric 
          ? { id: { $eq: parseInt(categoryFilter, 10) } } 
          : { documentId: { $eq: categoryFilter } },
      };
    }

    fetchTickets(params);
  }, [page, search, statusFilter, categoryFilter, sortBy, fetchTickets]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Total pages from Strapi meta
  const totalPages = pagination?.pageCount || 1;

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl">
        <TicketHeader />

        {/* Pass state and handlers down to TicketControls */}
        <TicketControls
          search={search}
          onSearch={(v) => { setSearch(v); setPage(1); }}
          statusFilter={statusFilter}
          onStatusFilter={(v) => { setStatusFilter(v); setPage(1); }}
          categoryFilter={categoryFilter}
          onCategoryFilter={(v) => { setCategoryFilter(v); setPage(1); }}
          sortBy={sortBy}
          onSortBy={(v) => { setSortBy(v); setPage(1); }}
          categories={categories}
        />

        {/* Ticket List */}
        <section className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
          {/* Column Headers */}
          <div className="hidden md:grid grid-cols-12 gap-md px-lg py-md border-b border-outline-variant bg-surface-container-low font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            <div className="col-span-2">Ticket ID</div>
            <div className="col-span-4">Subject</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Submitted</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-md px-lg py-md border-b border-outline-variant animate-pulse items-center">
                  <div className="md:col-span-2 h-4 bg-surface-container-high rounded w-16"></div>
                  <div className="md:col-span-4 h-4 bg-surface-container-high rounded w-48"></div>
                  <div className="md:col-span-2 h-4 bg-surface-container-high rounded w-24"></div>
                  <div className="md:col-span-2 h-4 bg-surface-container-high rounded w-24"></div>
                  <div className="md:col-span-2 h-6 bg-surface-container-high rounded-full w-20"></div>
                </div>
              ))
            ) : tickets.length === 0 ? (
              <div className="p-lg text-center text-on-surface-variant">No tickets found.</div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.documentId || ticket.id}
                  onClick={() => navigate(`/user/tickets/${ticket.documentId || ticket.id}`)}
                  className="cursor-pointer"
                >
                  <TicketItem
                    id={`#${(ticket.documentId || ticket.id).substring(0, 8).toUpperCase()}`}
                    subject={ticket.subject}
                    category={ticket.category?.name || "—"}
                    date={new Date(ticket.createdAt).toLocaleDateString()}
                    status={ticket.state || "Open"}
                  />
                </div>
              ))
            )}
          </div>

          {/* Pagination — only show if more than 1 page */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Tickets;
