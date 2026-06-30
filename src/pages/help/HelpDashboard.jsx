import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/help/dashboard/DashboardHeader";
import KpiCards from "../../components/help/dashboard/KpiCards";
import RecentActivity from "../../components/help/dashboard/RecentActivity";
import useHelpStore from "../../store/useHelpStore";
import { useAuthStore } from "../../auth/authStore";

export default function HelpDashboard() {
  const { user } = useAuthStore();
  const { loadDashboardData, dashboardStats, recentTickets, dashboardPagination, isLoading, optimisticUpdateTicket } = useHelpStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user?.id) {
      loadDashboardData(user.documentId || user.id, currentPage);
    }
  }, [user, currentPage, loadDashboardData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAssignToMe = async (ticketId) => {
    try {
      await optimisticUpdateTicket(ticketId, { assignee: user.documentId || user.id });
      // Refresh dashboard after assignment to update counts
      loadDashboardData(user.documentId || user.id, currentPage);
    } catch (error) {
      console.error("Failed to assign ticket", error);
    }
  };

  return (
    <main className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl">
      <DashboardHeader />
      <KpiCards stats={dashboardStats} isLoading={isLoading} />
      <RecentActivity 
        tickets={recentTickets} 
        isLoading={isLoading} 
        pagination={dashboardPagination} 
        onPageChange={handlePageChange} 
        onAssignMe={handleAssignToMe}
      />
    </main>
  );
}
