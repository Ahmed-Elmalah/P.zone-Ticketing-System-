// ============================================================
// index.js  (auth folder)
// Single entry point for the entire auth system.
// Import anything auth-related from here:
//
//   import { useLogin, ProtectedRoute, useAuthStore } from "../auth"
// ============================================================

export { default as ProtectedRoute } from "./ProtectedRoute";
export { default as useLogin } from "./useLogin";
export { default as LoginRepo } from "./LoginRepo";
export { useAuthStore } from "./authStore";
export { roleConfig, getRedirectByRole, isValidRole, defaultRedirect } from "./roleConfig";