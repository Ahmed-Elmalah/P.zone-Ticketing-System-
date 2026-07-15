import React, { useEffect } from "react";
import TicketsHeader from "../../components/help/tickets/TicketsHeader";
import TicketsFilterBar from "../../components/help/tickets/TicketsFilterBar";
import TicketsTable from "../../components/help/tickets/TicketsTable";
import useHelpStore from "../../store/useHelpStore";
import { useAuthStore } from "../../auth/authStore";
import { toast } from "react-hot-toast";

export default function Tickets() {
  const { user } = useAuthStore();
  const { 
    queueTickets, 
    isLoading, 
    activeTab, 
    setActiveTab, 
    loadQueue, 
    pagination,
    optimisticUpdateTicket,
    urgentCount,
    loadUrgentCount
  } = useHelpStore();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [priorityFilter, setPriorityFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Load tickets whenever the active tab, filters, page, or user changes
  useEffect(() => {
    if (user?.id) {
      loadQueue(user.documentId || user.id, currentPage, {
        search,
        status: statusFilter,
        priority: priorityFilter
      });
      loadUrgentCount(); // Load urgent count to show in the badge
    }
  }, [activeTab, search, statusFilter, priorityFilter, currentPage, user?.id, loadQueue, user?.documentId, loadUrgentCount]);

  // Reset to page 1 when filters or tabs change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search, statusFilter, priorityFilter]);

  const handleAssignToMe = async (ticketId) => {
    try {
      await optimisticUpdateTicket(ticketId, { assignee: user.documentId || user.id });
      toast.success("Ticket assigned to you successfully.");
      // The ticket will disappear from "Unassigned" because the API will filter it out on next fetch,
      // but for optimistic UI, we might want to manually filter it or just re-fetch.
      loadQueue(user.documentId || user.id);
    } catch (error) {
      toast.error("Failed to assign ticket.");
    }
  };

  const tabs = [
    { id: "unassigned", label: "Unassigned Queue" },
    { id: "mine", label: "My Assigned Tickets" },
    { id: "urgent", label: "Urgent & Critical" },
    { id: "resolved", label: "Resolved / Closed" },
  ];

  return (
    <main className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-2xl flex flex-col gap-xl">
      <TicketsHeader />

      {/* Tabs for Queue Management */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-lg py-2 font-button-text text-button-text rounded-t-lg border-b-2 transition-colors relative flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/10"
                : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            {tab.label}
            {tab.id === "urgent" && urgentCount > 0 && (
              <span className="bg-error text-white text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full">
                {urgentCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <TicketsFilterBar 
        search={search}
        onSearch={setSearch}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilter={setPriorityFilter}
      />

      <TicketsTable 
        tickets={queueTickets} 
        isLoading={isLoading} 
        activeTab={activeTab} 
        onAssignMe={handleAssignToMe}
        pagination={pagination}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
