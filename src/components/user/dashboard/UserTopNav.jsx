// ============================================================
// UserTopNav.jsx
// Sticky top navigation bar for all user pages.
// Contains brand, nav links, New Ticket button, and logout.
// Responsive: Burger menu on the right with smooth animation.
// ============================================================

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdAdd,
  MdConfirmationNumber,
  MdLogout,
  MdMenu,
  MdClose,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import { useAuthStore } from "../../../auth/authStore";
import useLogin from "../../../auth/useLogin";
import useThemeStore from "../../../store/useThemeStore";
import NotificationBell from "../../shared/NotificationBell";
import ThemeToggle from "../../shared/ThemeToggle";
import LogoImage from "../../../assets/P.zone-LogoBlack-Version-01-2048x753.png";

// Nav links shown in the top bar
const navLinks = [
  { to: "dashboard", label: "Dashboard" },
  { to: "tickets", label: "My Tickets" },
];

export default function UserTopNav() {
  const { user } = useAuthStore();
  const { logOut } = useLogin();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();

  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-surface-container-lowest w-full top-0 sticky border-b border-outline-variant z-50">
      <div className="flex justify-between items-center px-margin-desktop py-md max-w-360 mx-auto">
        {/* ── Left Side: Logo + Desktop Links ── */}
        <div className="flex items-center gap-xl">
          {/* Logo */}
          <div
            className="flex items-center gap-sm cursor-pointer"
            onClick={() => {
              navigate("dashboard");
              setIsOpen(false);
            }}
          >
            <img src={LogoImage} alt="P.ZONE Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <span className="font-headline-md text-headline-md font-bold text-primary">
              P.ZONE
            </span>
          </div>

          {/* Desktop Links — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-body-md text-body-md font-semibold pb-1 transition-colors
                  ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* ── Right Side: Desktop Actions OR Mobile Burger ── */}
        <div className="flex items-center gap-md">
          {/* Desktop Actions — hidden on mobile */}
          <button
            onClick={() => navigate("tickets/new")}
            className="hidden lg:flex bg-primary text-on-primary px-lg py-sm rounded-lg
              font-button-text text-button-text hover:bg-on-primary-fixed-variant
              transition-colors items-center gap-sm shadow-sm"
          >
            <MdAdd size={18} />
            New Ticket
          </button>

          {/* Notification Bell */}
          <div className="hidden md:flex items-center gap-xs">
            <ThemeToggle />
            <NotificationBell />
          </div>

          {/* User avatar — hidden on mobile */}
          <div
            onClick={() => navigate("profile")}
            className="hidden md:flex h-8 w-8 rounded-full bg-primary-container text-on-primary-container
            items-center justify-center font-bold border border-outline-variant cursor-pointer"
          >
            <span className="font-label-md text-label-md">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </span>
          </div>

          {/* Logout button — hidden on mobile */}
          <button
            onClick={logOut}
            className="hidden md:flex p-2 rounded-full hover:bg-error-container text-on-surface-variant
              hover:text-error transition-colors"
            title="Sign Out"
          >
            <MdLogout size={20} />
          </button>

          {/* Mobile Actions: Notification Bell + Dark Mode + Burger Button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <NotificationBell />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-xs text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors"
              title="Toggle Menu"
            >
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu with Smooth Animation ── */}
      {/* Removed {isOpen && ...} so the close transition can actually play */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-surface-container-lowest border-t border-outline-variant px-margin-desktop py-md shadow-lg flex flex-col gap-md z-50 
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto visibility-visible"
              : "opacity-0 -translate-y-4 pointer-events-none visibility-hidden"
          }`}
      >
        {/* Mobile Links */}
        <ul className="flex flex-col gap-sm">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block font-body-md text-body-md font-semibold py-sm transition-colors
                  ${
                    isActive
                      ? "text-primary pl-xs border-l-2 border-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile New Ticket button */}
        <button
          onClick={() => {
            navigate("/user/tickets/new");
            setIsOpen(false);
          }}
          className="lg:hidden w-full justify-center bg-primary text-on-primary px-lg py-sm rounded-lg
            font-button-text text-button-text hover:bg-on-primary-fixed-variant
            transition-colors flex items-center gap-sm shadow-sm mt-xs"
        >
          <MdAdd size={18} />
          New Ticket
        </button>

        {/* Divider line */}
        <div className="border-t border-outline-variant my-xs"></div>

        {/* Mobile User Profile + Logout Section */}
        <div className="flex items-center justify-between py-xs bg-surface-container-low p-sm rounded-lg">
          <div
            onClick={() => {
              navigate("profile");
              setIsOpen(false);
            }}
            className="flex items-center gap-sm"
          >
            <div
              className="h-9 w-9 rounded-full bg-primary-container text-on-primary-container
              flex items-center justify-center font-bold border border-outline-variant shadow-sm cursor-pointer"
            >
              <span className="font-label-md text-label-md">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <span className="font-body-md text-body-md font-bold text-on-surface truncate max-w-37.5">
              {user?.username || "User"}
            </span>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              logOut();
            }}
            className="flex items-center gap-xs px-md py-sm bg-error-container text-error 
              hover:bg-error hover:text-on-error rounded-lg font-button-text text-xs 
              transition-all shadow-sm"
          >
            <MdLogout size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
