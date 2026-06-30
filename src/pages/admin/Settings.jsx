import React, { useState, useEffect } from "react";
import ITCategoriesSettings from "../../components/admin/settings/ITCategoriesSettings";
import AnnouncementManager from "../../components/admin/settings/AnnouncementManager";
import QuickActionsManager from "../../components/admin/settings/QuickActionsManager";
import useAdminStore from "../../store/useAdminStore";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("Categories");
  const { fetchSettings, fetchCategories } = useAdminStore();

  useEffect(() => {
    fetchSettings();
    fetchCategories();
  }, [fetchSettings, fetchCategories]);

  const tabs = ["Categories", "Announcements", "Quick Actions"];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-360 mx-auto w-full">
        {/* Page Title */}
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-lg">
          System Settings
        </h2>

        {/* Settings Tabs */}
        <div className="flex gap-lg border-b border-outline-variant/30 overflow-x-auto mb-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-sm font-button-text text-button-text transition-colors whitespace-nowrap px-sm ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {activeTab === "Categories" && <ITCategoriesSettings />}
          {activeTab === "Announcements" && <AnnouncementManager />}
          {activeTab === "Quick Actions" && <QuickActionsManager />}
        </div>
      </main>
    </div>
  );
}
