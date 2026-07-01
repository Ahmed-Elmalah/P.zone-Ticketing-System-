// ============================================================
// AdminLayout.jsx
// Layout wrapper for all admin pages.
//
// Handles responsive sidebar state:
//   Mobile  → burger button in top bar opens the drawer
//   Tablet  → sidebar always visible (icon only, no toggle)
//   Desktop → sidebar always visible (full)
// ============================================================

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import AdminSidebar from "../components/admin/dashboard/AdminSidebar";
import AdminFooter from "../components/admin/dashboard/AdminFooter";
import NotificationBell from "../components/shared/NotificationBell";

export default function AdminLayout() {
  // Controls mobile drawer — tablet/desktop ignore this
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      {/* ── Sidebar ── */}
      <AdminSidebar
        isMobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* ── Main content + footer ── */}
      {/*
        Margin left accounts for sidebar width:
          mobile  → ml-0  (sidebar is overlay, not in flow)
          tablet  → ml-16 (icon-only sidebar = 4rem)
          desktop → ml-70 (full sidebar = 17.5rem)
      */}
      <div className="flex-1 ml-0 md:ml-16 lg:ml-70 flex flex-col min-h-screen w-full">
        {/* ── Mobile top bar — burger + brand ── */}
        {/* Only rendered on mobile; hidden on tablet+ */}
        <header
          className="md:hidden sticky top-0 z-30 bg-surface-container-lowest
          border-b border-outline-variant px-md py-sm
          flex items-center justify-between"
        >
          <span className="font-headline-md text-headline-md font-bold text-primary">
            P.ZONE
          </span>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-full hover:bg-surface-container-high
                text-on-surface-variant transition-colors"
            >
              <MdMenu size={24} />
            </button>
          </div>
        </header>

        {/* ── Child pages render here ── */}
        <Outlet />

        {/* ── Footer ── */}
        {/* <AdminFooter /> */}
      </div>
    </div>
  );
}
