import React, { useEffect } from "react";
import UsersRow from "./UsersRow";
import useAdminStore from "../../../store/useAdminStore";

export default function UsersGrid({ searchTerm = "", roleFilter = "All" }) {
  const { users, fetchUsers, isLoadingUsers, roles, fetchRoles } = useAdminStore();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

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

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col flex-1">
      
      {/* ── Table Container ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-surface-container-high border-b-2 border-outline-variant">
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-left">User Details</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-left">Role</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-left">Status</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="divide-y divide-outline-variant">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-xl text-center text-outline">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <UsersRow key={user.id} user={user} roles={roles} />
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="border-t border-outline-variant bg-surface-container-lowest px-md py-3 flex items-center justify-between mt-auto">
        <span className="font-body-md text-body-md text-on-surface-variant">
          Showing 1 to {filteredUsers.length} of {filteredUsers.length} users
        </span>
        <div className="flex gap-xs">
          <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface-variant disabled:opacity-50 transition-colors" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface-variant disabled:opacity-50 transition-colors" disabled>
            Next
          </button>
        </div>
      </div>

    </div>
  );
}