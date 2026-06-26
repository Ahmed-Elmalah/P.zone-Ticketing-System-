import React from "react";
import { MdPersonAdd } from "react-icons/md";
import TopHeader from "../../components/admin/shared/TopHeader";
import UsersHeader from "../../components/admin/users/UsersHeader";
import UsersGrid from "../../components/admin/users/UsersGrid";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  // Custom action button for the Users page
  const addUserBtn = (
    <Link to={'new'} className="bg-primary text-on-primary font-button-text text-button-text p-sm sm:py-sm sm:px-md rounded-lg flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm active:scale-[0.98]">
      <MdPersonAdd size={20} />
      <span className="hidden sm:inline">Add New User</span>
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* 1. Shared Header with specific button */}
      <TopHeader placeholder="Search users..." actionButton={addUserBtn} />

      {/* 2. Main Layout Area */}
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-360 mx-auto w-full flex flex-col">
        <div className="flex flex-col gap-lg flex-1">
          {/* Page Title & Top Actions */}
          <UsersHeader />

          {/* Users Table & Pagination */}
          <UsersGrid />
        </div>
      </main>
    </div>
  );
}
