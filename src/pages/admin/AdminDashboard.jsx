import React, { useEffect } from "react";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import KpiGrid from "../../components/admin/dashboard/KpiGrid";
import CategoryChart from "../../components/admin/dashboard/CategoryChart";
import TopAgents from "../../components/admin/dashboard/TopAgents";
import RealTimeFeed from "../../components/admin/dashboard/RealTimeFeed";
import useAdminStore from "../../store/useAdminStore";

export default function AdminDashboard() {
  const { dashboardStats, recentTickets, topAgents, isLoadingDashboard, fetchDashboardData } = useAdminStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <>
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-360 mx-auto w-full">
        <DashboardHeader />

        <KpiGrid stats={dashboardStats} isLoading={isLoadingDashboard} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-xl mb-lg">
          <CategoryChart isLoading={isLoadingDashboard} />
          <TopAgents agents={topAgents} isLoading={isLoadingDashboard} />
        </div>

        <RealTimeFeed tickets={recentTickets} isLoading={isLoadingDashboard} />
      </main>
    </>
  );
}
