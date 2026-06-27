// ============================================================
// UserDetailsHeader.jsx
// Header for the user details page.
// Shows user avatar (initials), name, role badge, and email.
//
// View mode  → Edit button + Delete button
// Edit mode  → Save button + Cancel button
//
// Props:
//   user       - { username, email, role }
//   isEditing  - boolean
//   onEdit     - start editing
//   onCancel   - cancel editing (revert form)
//   onDelete   - delete the user
// ============================================================

import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

// Role badge colors per role name
const ROLE_BADGE = {
  admin: "bg-error-container text-on-error-container",
  help: "bg-primary-container text-on-primary-container",
  authenticated: "bg-secondary-container text-on-secondary-container",
};

const ROLE_LABEL = {
  admin: "Administrator",
  help: "HelpDesk Agent",
  authenticated: "Standard User",
};

export default function UserDetailsHeader({
  user = {},
  isEditing = false,
  onEdit,
  onCancel,
  onDelete,
  isSubmitting = false,
}) {
  const roleName = user?.role?.name?.toLowerCase() || "authenticated";

  // First letter of username for avatar fallback
  const initials = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <div
      className="p-lg border-b border-outline-variant bg-surface
      flex flex-col sm:flex-row sm:items-center justify-between gap-md"
    >
      {/* ── Left: avatar + user info ── */}
      <div className="flex items-center gap-md">
        {/* Avatar circle */}
        <div
          className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container
          flex items-center justify-center font-bold text-xl shrink-0
          border border-outline-variant"
        >
          {initials}
        </div>

        {/* Name + role + email */}
        <div>
          <div className="flex items-center gap-sm flex-wrap">
            <h1 className="font-headline-md text-headline-md text-on-surface">
              {user?.username || "User"}
            </h1>
            <span
              className={`px-sm py-xs rounded-full font-label-md text-label-md
              ${ROLE_BADGE[roleName] || ROLE_BADGE.authenticated}`}
            >
              {ROLE_LABEL[roleName] || roleName}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            {user?.email || ""}
          </p>
        </div>
      </div>

      {/* ── Right: action buttons ── */}
      <div className="flex items-center gap-sm shrink-0">
        {isEditing ? (
          /* Edit mode → Save + Cancel */
          <>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-xs px-md py-sm rounded-lg
                font-button-text text-button-text text-on-surface-variant
                border border-outline-variant hover:bg-surface-container-low transition-colors"
            >
              <MdClose size={18} /> Cancel
            </button>

            <button
              type="submit"
              form="user-details-form"
              disabled={isSubmitting}
              className="flex items-center gap-xs px-md py-sm rounded-lg
                font-button-text text-button-text text-on-primary bg-primary
                hover:opacity-90 transition-opacity shadow-sm
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <MdCheck size={18} />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          /* View mode → Edit + Delete */
          <>
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-xs px-md py-sm rounded-lg
                font-button-text text-button-text text-on-surface
                border border-outline-variant hover:bg-surface-container-low transition-colors"
            >
              <MdEdit size={18} /> Edit
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-xs px-md py-sm rounded-lg
                font-button-text text-button-text text-on-error
                border border-error-container bg-error-container
                hover:opacity-90 transition-opacity"
            >
              <MdDelete size={18} /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
