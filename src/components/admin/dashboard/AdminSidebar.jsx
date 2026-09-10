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
import ThemeToggle from "../../shared/ThemeToggle";
import LogoImage from "../../../assets/P.zone-LogoBlack-Version-01-2048x753.png";

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
          fixed z-50 flex flex-col
          transition-transform duration-300 ease-in-out

          /* Mobile styles (drawer) */
          inset-y-0 left-0 bg-surface-container-low border-r border-outline-variant
          w-70 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}

          /* Tablet/Desktop styles (floating glass island) */
          md:translate-x-0 md:inset-auto md:top-4 md:left-4 md:bottom-4 md:rounded-[24px] md:border-0 md:glass-card md:!bg-transparent
          md:w-16
          lg:w-70
        `}
      >
        {/* ── Brand — Desktop + Mobile ── */}
        {/* Shown on mobile (inside drawer) and desktop, hidden on tablet */}
        <div
          className="flex items-center justify-between py-lg px-xl
          border-b border-outline-variant/50 md:hidden lg:flex"
        >
          <div className="flex items-center gap-sm">
            <img src={LogoImage} alt="P.ZONE Logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
            <span className="font-headline-md text-headline-md font-bold text-primary">
              P.ZONE
            </span>
          </div>
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
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={LogoImage} alt="P.ZONE Logo" className="w-10 h-10 object-contain" />
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
                flex items-center gap-sm py-3 px-lg rounded-xl
                font-button-text text-button-text transition-colors

                md:px-0 md:justify-center md:gap-0
                lg:px-lg lg:justify-start lg:gap-sm

                ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-on-surface-variant hover:bg-surface-container-high border border-transparent"
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
              bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] text-white rounded-xl font-button-text font-extrabold text-button-text
              hover:brightness-110 transition-all shadow-[0_2px_8px_rgba(79,70,229,0.25)]"
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
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white border border-outline-variant
                flex items-center justify-center overflow-hidden shrink-0"
              >
                <span className="font-label-md text-label-md">
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
              <ThemeToggle />
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
