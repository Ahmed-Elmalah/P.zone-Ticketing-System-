// ============================================================
// ProtectedRoute.jsx
// Wraps any page that requires authentication.
// Checks if the user is logged in and has the required role.
//
// Usage:
//   <ProtectedRoute allowedRoles={["admin"]}>
//     <AdminPage />
//   </ProtectedRoute>
//
//   <ProtectedRoute allowedRoles={["admin", "agent"]}>
//     <SharedPage />
//   </ProtectedRoute>
//
//   <ProtectedRoute>   ← no role check, just must be logged in
//     <AnyAuthPage />
//   </ProtectedRoute>
// ============================================================

import { Navigate, useLocation } from "react-router-dom";
import { getRedirectByRole, defaultRedirect } from "./roleConfig";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();

  // Read JWT from sessionStorage first, then localStorage
  const token =
    sessionStorage.getItem("jwt-token") ||
    localStorage.getItem("jwt-token");

  // Read user info from storage
  const userInfo = JSON.parse(
    sessionStorage.getItem("user-info") ||
    localStorage.getItem("user-info") ||
    null
  );

  // ── Step 1: Not logged in → go to login page ──────────────
  if (!token || !userInfo) {
    return (
      <Navigate
        to={defaultRedirect}
        state={{ from: location }} // remember where they came from
        replace
      />
    );
  }

  // Get the logged-in user's role as lowercase string
  const userRole = userInfo?.role?.name?.toLowerCase().trim() || "";

  // ── Step 2: Role check (only if allowedRoles is provided) ──
  if (allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase().trim());

    // If user's role is NOT in the allowed list → redirect to their own page
    if (!normalizedAllowed.includes(userRole)) {
      const correctPath = getRedirectByRole(userRole);
      return <Navigate to={correctPath} replace />;
    }
  }

  // ── Step 3: All checks passed → render the page ───────────
  return children;
}