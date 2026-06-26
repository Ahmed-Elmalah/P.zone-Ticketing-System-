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

// ── Edit roles here ──────────────────────────────────────────
// value must match the Strapi role name exactly
const ROLES = [
  {
    value:       "authenticated",
    icon:        MdPerson,
    label:       "Standard User",
    description: "Can create tickets, view own history, and access the public knowledge base.",
  },
  {
    value:       "help",
    icon:        MdSupportAgent,
    label:       "HelpDesk Agent",
    description: "Can manage assigned tickets, communicate with users, and edit internal knowledge base articles.",
  },
  {
    value:       "admin",
    icon:        MdAdminPanelSettings,
    label:       "Administrator",
    description: "Full system access, including user management, system settings, and advanced reporting.",
  },
];

export default function RoleAssignment({ selectedRole, onChange }) {
  return (
    <div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
        Role Assignment
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
        Select the appropriate access level for this employee.
      </p>

      <div className="flex flex-col gap-md">
        {ROLES.map((role) => (
          <RoleCard
            key={role.value}
            {...role}
            isSelected={selectedRole === role.value}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}