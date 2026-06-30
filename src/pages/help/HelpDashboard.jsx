import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/help/dashboard/DashboardHeader";
import KpiCards from "../../components/help/dashboard/KpiCards";
import RecentActivity from "../../components/help/dashboard/RecentActivity";
import useHelpStore from "../../store/useHelpStore";
import { useAuthStore } from "../../auth/authStore";

export default function HelpDashboard() {
  const { user } = useAuthStore();
  const { loadDashboardData, dashboardStats, recentTickets, dashboardPagination, isLoading } = useHelpStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user?.id) {
      loadDashboardData(user.documentId || user.id, currentPage);
    }
  }, [user, currentPage, loadDashboardData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl">
      <DashboardHeader />
      <KpiCards stats={dashboardStats} />
      <RecentActivity 
        tickets={recentTickets} 
        isLoading={isLoading} 
        pagination={dashboardPagination} 
        onPageChange={handlePageChange} 
      />
    </main>
  );
}
