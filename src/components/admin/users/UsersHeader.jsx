import React from "react";
import { MdFilterList } from "react-icons/md";

export default function UsersHeader({ roles = [], roleFilter, setRoleFilter }) {
  // Exclude 'Public' from filters
  const filterRoles = roles.filter(r => r.name.toLowerCase() !== 'public');

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
      
      {/* ── Page Title & Description ── */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Organization Users
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Manage system access, roles, and user statuses.
        </p>
      </div>
      
      {/* ── Action Buttons ── */}
      <div className="flex gap-sm items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <MdFilterList size={18} />
          </div>
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-9 pr-8 py-2 border border-outline-variant rounded-lg font-button-text text-on-surface hover:bg-surface-container transition-colors bg-surface-container-lowest shadow-sm appearance-none outline-none focus:border-primary"
          >
            <option value="All">All Roles</option>
            {filterRoles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
}