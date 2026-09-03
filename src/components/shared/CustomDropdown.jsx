import React, { useState, useRef, useEffect } from "react";
import { MdExpandMore, MdCheck, MdSearch } from "react-icons/md";

/**
 * Universal Custom Dropdown Component
 * @param {Array<{value: string|number, label: string, icon?: React.ReactNode, description?: string}>} options
 * @param {string|number} value - Selected value
 * @param {function} onChange - Callback receiving selected value
 * @param {string} placeholder - Default text when nothing is selected
 * @param {boolean} searchable - If true, renders a live search filter input inside the menu
 * @param {"filter" | "form" | "card"} variant - Visual styling variant
 * @param {boolean} disabled - Disable interaction
 * @param {string} className - Additional CSS wrapper classes
 */
export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  searchable = false,
  variant = "filter",
  disabled = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  const filteredOptions =
    searchable && searchTerm.trim()
      ? options.filter((opt) =>
          String(opt.label).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

  // Variant styling for trigger button
  const getTriggerStyles = () => {
    switch (variant) {
      case "form":
        return "w-full bg-surface-container-low rounded-lg border border-outline-variant px-md py-3 text-on-surface font-body-md text-body-md min-h-[48px] focus:border-primary focus:ring-2 focus:ring-primary/20";
      case "card":
        return "w-full flex items-center justify-between p-sm bg-surface-container-low border border-outline-variant rounded-lg hover:bg-surface-container transition-colors";
      case "filter":
      default:
        return "bg-surface border border-outline-variant rounded-md px-md py-sm text-sm font-body-md text-on-surface hover:bg-surface-container transition-colors focus:ring-2 focus:ring-primary min-w-40";
    }
  };

  const menuWidthClass =
    variant === "form"
      ? "w-full min-w-full left-0 right-0"
      : "min-w-[220px] w-max max-w-xs sm:max-w-md left-0";

  return (
    <div
      className={`relative ${variant === "form" ? "w-full" : "inline-block"} ${className}`}
      ref={dropdownRef}
    >
      {/* Trigger Box */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`${getTriggerStyles()} flex items-center justify-between gap-sm outline-none cursor-pointer select-none transition-all ${
          isOpen ? "ring-2 ring-primary/20 border-primary" : ""
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span className="truncate text-left flex-1">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <MdExpandMore
          size={18}
          className={`text-on-surface-variant shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div className={`absolute z-50 mt-1 bg-surface border border-outline-variant rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${menuWidthClass}`}>
          {/* Optional Search Bar */}
          {searchable && (
            <div className="p-2 border-b border-outline-variant bg-surface-container-lowest sticky top-0 flex items-center gap-2">
              <MdSearch size={18} className="text-on-surface-variant shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none"
              />
            </div>
          )}

          {/* Options List — scrollbar hidden for sleek modern look */}
          <ul className="max-h-60 overflow-y-auto p-1.5 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-3 text-xs text-on-surface-variant text-center italic">
                No matching options
              </li>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <li
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className={`px-3 py-2.5 text-sm rounded-lg cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span className="flex-1 truncate">{opt.label}</span>
                    {isSelected && (
                      <MdCheck size={16} className="text-primary shrink-0" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
