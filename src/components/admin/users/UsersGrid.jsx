import React from "react";
import UsersRow from "./UsersRow";

// Dummy data representing the users
const usersData = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@supporthub.com",
    initials: "JS",
    avatar: null,
    avatarColor: "bg-primary-fixed text-on-primary-fixed",
    role: "Admin",
    roleStyle: "bg-primary text-on-primary",
    status: "Active",
    statusDot: "bg-secondary",
    department: "IT Operations",
    lastActive: "Just now"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    email: "m.rodriguez@supporthub.com",
    initials: "MR",
    avatar: null,
    avatarColor: "bg-surface-variant text-on-surface",
    role: "HelpDesk",
    roleStyle: "bg-secondary text-on-secondary",
    status: "Active",
    statusDot: "bg-secondary",
    department: "Customer Support",
    lastActive: "2 hours ago"
  },
  {
    id: 3,
    name: "David Chen",
    email: "d.chen@supporthub.com",
    initials: "DC",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX1B_Z-rJqFaTxuR9NHBdF7XTZg1m_OD5qDxluDZL2Conxe1u4NjTkiA33mu4SVe0ALUXURMfh3lDMu4DoJO_nxo6_3rwAIRNrG_PEv3xq2kDXBiGM4qP94-cmLV8w9j2KQJvC99zrJnpp3Xnv4O-F1kv_439jejxPaAdAEd_7T3Dzwe1X6jOlpUCCfc1KFfR_9A7_pxDCIlMCK_XWBJDp9-FKZvwfpctsFuietBu-RkVHjt4kkVXZ1lUQSLTUFmC87PtGAYoX_N8", // Image avatar
    avatarColor: "",
    role: "User",
    roleStyle: "bg-surface border border-outline-variant text-on-surface",
    status: "Inactive",
    statusDot: "bg-error",
    department: "Marketing",
    lastActive: "Oct 12, 2023"
  }
];

export default function UsersGrid() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col flex-1">
      
      {/* ── Table Container ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-surface-container-high border-b-2 border-outline-variant">
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">User Details</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Role</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Department</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Last Active</th>
              <th className="py-3 px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="divide-y divide-outline-variant">
            {usersData.map((user) => (
              <UsersRow key={user.id} user={user} />
            ))}
          </tbody>

        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="border-t border-outline-variant bg-surface-container-lowest px-md py-3 flex items-center justify-between mt-auto">
        <span className="font-body-md text-body-md text-on-surface-variant">
          Showing 1 to {usersData.length} of 124 users
        </span>
        <div className="flex gap-xs">
          <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface-variant disabled:opacity-50 transition-colors" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface-variant hover:bg-surface-container transition-colors">
            Next
          </button>
        </div>
      </div>

    </div>
  );
}