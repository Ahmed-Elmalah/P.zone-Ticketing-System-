// ============================================================
// UserLayout.jsx
// Layout wrapper for regular user pages.
// Uses TopNav + main content area (no sidebar).
// Child pages render inside <Outlet />.
// ============================================================

import { Outlet, useLocation } from "react-router-dom";
import UserTopNav from "../components/user/dashboard/UserTopNav";

export default function UserLayout() {
  const location = useLocation();
  const isTicketDetail = location.pathname.includes("/user/tickets/");
  
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      {/* Sticky top navigation */}
      {!isTicketDetail && <UserTopNav />}

      {/* Page content */}
      <div className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <Outlet />
      </div>
    </div>
  );
}
