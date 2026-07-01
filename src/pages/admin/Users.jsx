import React, { useState, useEffect } from "react";
import { MdPersonAdd } from "react-icons/md";
import TopHeader from "../../components/admin/shared/TopHeader";
import UsersHeader from "../../components/admin/users/UsersHeader";
import UsersGrid from "../../components/admin/users/UsersGrid";
import { Link } from "react-router-dom";
import useAdminStore from "../../store/useAdminStore";
import { MdUploadFile } from "react-icons/md";
import ImportUsersModal from "../../components/admin/users/ImportUsersModal";
import { userRepo } from "../../api/userRepo";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const { roles, fetchUsers } = useAdminStore();

  // Custom action button for the Users page
  const actionButton = (
    <div className="flex items-center gap-md">
      <button 
        onClick={() => setIsImportModalOpen(true)}
        className="bg-surface-container border border-outline-variant text-on-surface font-button-text p-sm sm:py-sm sm:px-md rounded-lg flex items-center justify-center gap-xs hover:bg-surface-container-high transition-colors shadow-sm active:scale-[0.98]"
      >
        <MdUploadFile size={20} />
        <span className="hidden sm:inline">Import Users</span>
      </button>
      <Link to={'new'} className="bg-primary text-on-primary font-button-text text-button-text p-sm sm:py-sm sm:px-md rounded-lg flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm active:scale-[0.98]">
        <MdPersonAdd size={20} />
        <span className="hidden sm:inline">Add New User</span>
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* 1. Shared Header with specific button */}
      <TopHeader 
        placeholder="Search users..." 
        actionButton={actionButton}
        value={searchTerm}
        onSearch={setSearchTerm}
      />

      {/* 2. Main Layout Area */}
      <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-360 mx-auto w-full flex flex-col">
        <div className="flex flex-col gap-lg flex-1">
          {/* Page Title & Top Actions */}
          <UsersHeader 
            roles={roles} 
            roleFilter={roleFilter} 
            setRoleFilter={setRoleFilter} 
          />

          {/* Users Table & Pagination */}
          <UsersGrid searchTerm={searchTerm} roleFilter={roleFilter} />
        </div>
      </main>

      {/* Import Modal */}
      <ImportUsersModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        roles={roles}
        userRepo={userRepo}
        onImportComplete={() => fetchUsers()}
      />
    </div>
  );
}
