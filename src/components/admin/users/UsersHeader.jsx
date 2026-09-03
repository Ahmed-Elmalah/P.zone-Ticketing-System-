import React from "react";
import CustomDropdown from "../../shared/CustomDropdown";

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
        <CustomDropdown
          value={roleFilter}
          onChange={setRoleFilter}
          placeholder="All Roles"
          searchable={false}
          options={[
            { value: "All", label: "All Roles" },
            ...filterRoles.map((role) => ({
              value: role.name,
              label: role.name,
            })),
          ]}
        />
      </div>

    </div>
  );
}