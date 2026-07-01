// ============================================================
// App.jsx
// Root component — contains the full router for the app.
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import { ProtectedRoute } from "./auth";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import HelpLayout from "./layouts/HelpLayout";

// Shared pages
import LoginPage from "./pages/Login/LoginPage";
import NotFound from "./pages/NotFound/NotFound"; //fix deploy error here

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTickets from "./pages/admin/Tickets";
import AdminTicketDetail from "./pages/admin/TicketDetail";
import AdminUsers from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import AdminSettings from "./pages/admin/Settings";
import AdminNewTicket from "./pages/admin/NewTicket";

// Help pages
import HelpDashboard from "./pages/help/HelpDashboard";
import UserLayout from "./layouts/Userlayout";
import HelpTickets from "./pages/help/Tickets";
import HelpTicketDetail from "./pages/help/HelpTicketDetail";
import HelpNewTicket from "./pages/help/HelpNewTicket";

// User pages
import UserDashboard from "./pages/user/Dashboard";
import UserTickets from "./pages/user/Tickets";
import NewTicket from "./pages/user/NewTicket";
import TicketDetail from "./pages/user/TicketDetail";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import UserDetails from "./pages/admin/UserDetails";
import GlobalSocketListener from "./components/shared/GlobalSocketListener";

// ── Root redirect ─────────────────────────────────────────────
// If there's a saved token → go to /admin (useLogin's checkToken
// will sort the correct page per role).
// If no token → go to login.
function RootRedirect() {
  const token =
    sessionStorage.getItem("jwt-token") || localStorage.getItem("jwt-token");

  return token ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <GlobalSocketListener />
        <Routes>
          {/* Root smart redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public — no auth needed */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── Admin routes ─────────────────────────────────── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="tickets/new" element={<HelpNewTicket />} />
            <Route path="tickets/:id" element={<AdminTicketDetail />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/new" element={<AddUser />} />
            <Route path="users/:id"       element={<UserDetails />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* ── Help Desk routes ─────────────────────────────── */}
          <Route
            path="/help"
            element={
              <ProtectedRoute allowedRoles={["help"]}>
                <HelpLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<HelpDashboard />} />
            {/* <Route path="queue"           element={<Queue />} /> */}
            <Route path="tickets" element={<HelpTickets />} />
            <Route path="tickets/new" element={<HelpNewTicket />} />
            <Route path="tickets/:id" element={<HelpTicketDetail />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* ── User routes ──────────────────────────────────── */}
          <Route
            path="/user"
            element={
              // "authenticated" is Strapi's default role name for regular users
              <ProtectedRoute allowedRoles={["authenticated"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="tickets" element={<UserTickets />} />
            <Route path="tickets/new" element={<NewTicket />} />
            <Route path="tickets/:id" element={<TicketDetail />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
