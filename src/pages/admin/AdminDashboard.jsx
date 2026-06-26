import React from "react";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import KpiGrid from "../../components/admin/dashboard/KpiGrid";
import CategoryChart from "../../components/admin/dashboard/CategoryChart";
import TopAgents from "../../components/admin/dashboard/TopAgents";
import RealTimeFeed from "../../components/admin/dashboard/RealTimeFeed";

export default function AdminDashboard() {
  return (
    <>
      {/* Clean, single-responsibility Main Container */}
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-360 mx-auto w-full">
        <DashboardHeader />

        <KpiGrid />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-xl mb-lg">
          <CategoryChart />
          <TopAgents />
        </div>

        <RealTimeFeed />
      </main>
    </>
  );
}
