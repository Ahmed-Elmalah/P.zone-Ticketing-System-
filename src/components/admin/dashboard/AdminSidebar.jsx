// ============================================================
// AdminSidebar.jsx
// Responsive sidebar with 3 modes:
//   Mobile  (<md)  → hidden, slides in as drawer with overlay
//   Tablet  (md)   → icons only, always visible (w-16)
//   Desktop (lg+)  → full sidebar with icons + text (w-70)
//
// Props:
//   isMobileOpen - controls mobile drawer state
//   onClose      - called when overlay or close btn is clicked
// ============================================================

import { NavLink, useNavigate } from "react-router-dom";
import {
  MdAnalytics,
  MdConfirmationNumber,
  MdGroup,
  MdSettings,
  MdAdd,
  MdDarkMode,
  MdClose,
  MdLogout,
} from "react-icons/md";
import useLogin from "../../../auth/useLogin";
import { useAuthStore } from "../../../auth/authStore";
import NotificationBell from "../../shared/NotificationBell";
import useThemeStore from "../../../store/useThemeStore";
import { MdLightMode } from "react-icons/md";

// ── Nav links config — add/remove here ──────────────────────
const NAV_LINKS = [
  { to: "/admin/dashboard", icon: MdAnalytics, label: "Analytics" },
  { to: "/admin/tickets", icon: MdConfirmationNumber, label: "Global Tickets" },
  { to: "/admin/users", icon: MdGroup, label: "Users" },
  { to: "/admin/settings", icon: MdSettings, label: "Settings" },
];

export default function AdminSidebar({ isMobileOpen, onClose }) {
  const navigate = useNavigate();
  const { logOut } = useLogin();
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      {/* ── Mobile overlay — dims background behind drawer ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 md:hidden
          ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-surface-container-low border-r border-outline-variant
          transition-transform duration-300 ease-in-out

          w-70
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:w-16
          lg:w-70
        `}
      >
        {/* ── Brand — Desktop + Mobile ── */}
        {/* Shown on mobile (inside drawer) and desktop, hidden on tablet */}
        <div
          className="flex items-center justify-between py-lg px-xl
          border-b border-outline-variant/50 md:hidden lg:flex"
        >
          <span className="font-headline-md text-headline-md font-bold text-primary">
            P.ZONE
          </span>
          {/* Close button — mobile drawer only */}
          <button
            onClick={onClose}
            className="md:hidden text-on-surface-variant hover:text-primary
              p-1 rounded-full hover:bg-surface-container-high transition-colors"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* ── Brand — Tablet only (icon badge) ── */}
        <div
          className="hidden md:flex lg:hidden justify-center py-lg
          border-b border-outline-variant/50"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="font-bold text-on-primary-container text-xs">
              PZ
            </span>
          </div>
        </div>

        {/* ── Nav Links ── */}
        <nav className="flex flex-col gap-xs px-md md:px-1.25 lg:px-md mt-lg flex-1">
          {NAV_LINKS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              title={label} // tooltip on tablet hover
              onClick={onClose} // close drawer when nav item tapped on mobile
              className={({ isActive }) => `
                flex items-center gap-sm py-3 px-lg rounded-lg
                font-button-text text-button-text transition-colors

                md:px-0 md:justify-center md:gap-0
                lg:px-lg lg:justify-start lg:gap-sm

                ${
                  isActive
                    ? "bg-primary-container text-white"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }
              `}
            >
              <Icon size={20} className="shrink-0" />
              {/* Text: visible on mobile drawer + desktop, hidden on tablet */}
              <span className="md:hidden lg:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ── Bottom: New Ticket + Profile ── */}
        <div className="p-md border-t border-outline-variant flex flex-col gap-md">
          {/* New Ticket button */}
          <button
            onClick={() => {
              navigate("/admin/tickets/new");
              onClose();
            }}
            title="New Ticket"
            className="w-full flex items-center justify-center gap-sm py-3
              bg-primary text-on-primary rounded-lg font-button-text text-button-text
              hover:opacity-90 transition-all shadow-sm"
          >
            <MdAdd size={20} />
            {/* Text hidden on tablet */}
            <span className="md:hidden lg:inline">New Ticket</span>
          </button>

          {/* Profile row */}
          <div
            className="flex items-center justify-between
            md:flex-col md:gap-sm lg:flex-row lg:justify-between"
          >
            {/* Avatar + username */}
            <div onClick={()=> navigate('profile')} className="flex cursor-pointer items-center gap-sm">
              <div
                className="w-8 h-8 rounded-full bg-primary-container border border-outline-variant
                flex items-center justify-center overflow-hidden shrink-0"
              >
                <span className="font-label-md text-label-md text-on-primary-container">
                  {user?.username?.[0]?.toUpperCase() || "A"}
                </span>
              </div>
              {/* Name hidden on tablet */}
              <span className="font-button-text text-button-text text-on-surface md:hidden lg:block">
                {user?.username || "Admin"}
              </span>
            </div>

            {/* Dark mode + logout */}
            <div className="flex flex-col md:flex-col lg:flex-row items-center gap-xs relative">
              <div className="hidden md:block">
                {/* On desktop/tablet, dropdown needs to open to the right and UP since it's at the bottom */}
                <div className="group relative">
                  <NotificationBell dropdownPosition="left-full bottom-0 ml-4" />
                </div>
              </div>
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
                className="p-2 rounded-full hover:bg-surface-container-high
                  transition-colors text-on-surface-variant"
              >
                {theme === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
              </button>
              <button
                onClick={logOut}
                title="Sign Out"
                className="p-2 rounded-full hover:bg-error-container
                  hover:text-error text-on-surface-variant transition-colors"
              >
                <MdLogout size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
