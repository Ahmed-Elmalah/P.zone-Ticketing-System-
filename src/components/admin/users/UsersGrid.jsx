import React, { useEffect, useState } from "react";
import UsersRow from "./UsersRow";
import useAdminStore from "../../../store/useAdminStore";

export default function UsersGrid({ searchTerm = "", roleFilter = "All" }) {
  const { users, fetchUsers, isLoadingUsers, roles, fetchRoles } = useAdminStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  useEffect(() => {
    // Reset to first page when search or filter changes
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  if (isLoadingUsers) {
    return <div className="animate-pulse bg-surface-container-lowest flex-1 rounded-xl"></div>;
  }

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      (user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "All" || (user.role && user.role.name === roleFilter);

    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col flex-1">
      
      {/* ── Table Container ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-left">User Details</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-left">Role</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-left">Status</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="divide-y divide-outline-variant/50">
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-xl text-center text-outline">No users found.</td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <UsersRow key={user.id} user={user} roles={roles} />
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="border-t border-outline-variant bg-surface-container-low px-md py-3 flex items-center justify-between mt-auto">
        <span className="font-body-md text-body-md text-on-surface-variant">
          Showing {filteredUsers.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
        </span>
        <div className="flex gap-xs">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface-variant hover:bg-surface-container disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface-variant hover:bg-surface-container disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}