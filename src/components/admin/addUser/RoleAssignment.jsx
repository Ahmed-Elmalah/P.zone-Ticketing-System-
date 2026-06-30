// ============================================================
// RoleAssignment.jsx
// Section heading + list of RoleCards for choosing access level.
//
// ROLES array is the single place to add/remove/rename roles.
// Each value must match a Strapi role name.
//
// Props:
//   selectedRole - current Formik value of "role"
//   onChange     - Formik's setFieldValue
// ============================================================

import { MdPerson, MdSupportAgent, MdAdminPanelSettings } from "react-icons/md";
import RoleCard from "./RoleCard";
import useAdminStore from "../../../store/useAdminStore";
import { useEffect } from "react";

// Static mapping for icons/descriptions since DB only has name/description
const ROLE_CONFIG = {
  authenticated: {
    icon: MdPerson,
    label: "Standard User",
    description: "Can create tickets, view own history, and access the public knowledge base."
  },
  helpdesk: {
    icon: MdSupportAgent,
    label: "HelpDesk Agent",
    description: "Can manage assigned tickets, communicate with users, and edit internal knowledge base articles."
  },
  admin: {
    icon: MdAdminPanelSettings,
    label: "Administrator",
    description: "Full system access, including user management, system settings, and advanced reporting."
  }
};

export default function RoleAssignment({
  selectedRole,
  onChange,
  disabled = false,
}) {
  const { roles, fetchRoles } = useAdminStore();

  useEffect(() => {
    if (roles.length === 0) fetchRoles();
  }, [roles.length, fetchRoles]);

  // Exclude public and map to config
  const displayRoles = roles
    .filter(r => r.name.toLowerCase() !== 'public')
    .map(r => {
      // Map strapi role name to our config (fallback to standard user)
      let key = 'authenticated';
      if (r.name.toLowerCase().includes('admin')) key = 'admin';
      if (r.name.toLowerCase().includes('help')) key = 'helpdesk';
      
      const config = ROLE_CONFIG[key];
      
      return {
        id: r.id,
        value: r.id, // Formik value will be the ID
        icon: config.icon,
        label: r.name, // Real name from DB
        description: r.description || config.description
      };
    });

  return (
    <div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
        Role Assignment
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
        Select the appropriate access level for this employee.
      </p>

      <div className="flex flex-col gap-md">
        {displayRoles.map((role) => (
          <RoleCard
            key={role.id}
            {...role}
            isSelected={selectedRole === role.id}
            onChange={onChange}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
