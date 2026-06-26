import React from 'react'
import UserTopNav from '../components/user/dashboard/UserTopNav';
import { Outlet, useLocation } from 'react-router-dom';

export default function HelpLayout() {
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
