// ============================================================
// roleConfig.js
// Central config file for all roles in the app.
// If you add a new role, just add it here — no need to touch
// any other file in the auth system.
// ============================================================

export const roleConfig = {
  admin: {
    redirect: "/admin",       // where to go after login
    label: "Admin",           // display name
  },
  help: {
    redirect: "/help",
    label: "HelpDesk",
  },
  authenticated: {
    redirect: "/user",
    label: "User",
  },
};

// Fallback redirect if the role is unknown or missing
export const defaultRedirect = "/login";

// Helper: get the redirect path for a given role string
export const getRedirectByRole = (roleName = "") => {
  const key = roleName.toLowerCase().trim();
  return roleConfig[key]?.redirect || defaultRedirect;
};

// Helper: check if a role string is valid/known
export const isValidRole = (roleName = "") => {
  const key = roleName.toLowerCase().trim();
  return Object.keys(roleConfig).includes(key);
};