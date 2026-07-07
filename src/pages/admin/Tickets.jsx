import React, { useState, useEffect, useCallback } from "react";
import TicketsFilters from "../../components/admin/tickets/TicketsFilters";
import TicketsGrid from "../../components/admin/tickets/TicketsGrid";
import TopHeader from "../../components/admin/shared/TopHeader";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useTicketStore from "../../store/useTicketStore";
import useAdminStore from "../../store/useAdminStore";

const PAGE_SIZE = 10;

export default function AdminTickets() {
  const navigate = useNavigate();
  const { tickets, fetchTickets, isLoading, pagination } = useTicketStore();
  const { categories, fetchCategories, fetchUsers, users } = useAdminStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt:desc");
  const [page, setPage] = useState(1);

  // Build Strapi query params and fetch
  const loadTickets = useCallback(() => {
    const params = {
      pagination: { page, pageSize: PAGE_SIZE },
      sort: sortBy,
      populate: ["creator", "assignee", "category"],
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

    if (priorityFilter) {
      params.filters = {
        ...params.filters,
        priority: { $eq: priorityFilter },
      };
    }

    if (assigneeFilter) {
      if (assigneeFilter === "unassigned") {
        params.filters = {
          ...params.filters,
          assignee: { id: { $null: true } },
        };
      } else {
        const isNumeric = /^\d+$/.test(assigneeFilter);
        params.filters = {
          ...params.filters,
          assignee: isNumeric 
            ? { id: { $eq: parseInt(assigneeFilter, 10) } } 
            : { documentId: { $eq: assigneeFilter } },
        };
      }
    }

    fetchTickets(params);
  }, [page, search, statusFilter, categoryFilter, priorityFilter, assigneeFilter, sortBy, fetchTickets]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, [fetchCategories, fetchUsers]);

  const addNewTicketBtn = (
    <button onClick={()=> navigate('new')} className="bg-primary text-on-primary font-button-text text-button-text p-sm sm:py-sm sm:px-md rounded-lg sm:rounded-lg flex items-center justify-center gap-xs hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]">
      <MdAdd size={20} />
      <span className="hidden sm:inline">New Ticket</span>
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* 1. Reusable Top Header with page-specific button */}
      <TopHeader
        placeholder="Search tickets by subject or ID..."
        value={search}
        onSearch={(v) => { setSearch(v); setPage(1); }}
        actionButton={addNewTicketBtn}
      />
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-360 mx-auto w-full">
        <div className="flex flex-col gap-lg">
          {/* 1. Page Header & Filters */}
          <TicketsFilters 
            statusFilter={statusFilter}
            onStatusFilter={(v) => { setStatusFilter(v); setPage(1); }}
            categoryFilter={categoryFilter}
            onCategoryFilter={(v) => { setCategoryFilter(v); setPage(1); }}
            priorityFilter={priorityFilter}
            onPriorityFilter={(v) => { setPriorityFilter(v); setPage(1); }}
            assigneeFilter={assigneeFilter}
            onAssigneeFilter={(v) => { setAssigneeFilter(v); setPage(1); }}
            categories={categories}
            users={users}
          />

          {/* 2. Data Grid (Table & Pagination) */}
          <TicketsGrid 
            tickets={tickets} 
            isLoading={isLoading} 
            pagination={pagination}
            page={page}
            setPage={setPage}
            pageSize={PAGE_SIZE}
          />
        </div>
      </main>
    </div>
  );
}
