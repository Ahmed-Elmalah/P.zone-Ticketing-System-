import React, { useState } from "react";
import TopHeader from "../../components/admin/shared/TopHeader";
import ITCategoriesSettings from "../../components/admin/settings/ITCategoriesSettings";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("IT Categories");

  const tabs = ["General", "IT Categories", "Priorities", "SLA Policies"];

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* <TopHeader placeholder="Search settings, tickets, users..." /> */}

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
        {activeTab === "IT Categories" && <ITCategoriesSettings />}
        {/* Add other components here for other tabs */}
      </main>
    </div>
  );
}
