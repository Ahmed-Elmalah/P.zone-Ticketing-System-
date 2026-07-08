import React, { useState, useRef, useEffect } from "react";
import { MdExpandMore, MdCheck } from "react-icons/md";

export default function SearchableSelect({
  options = [], // Array of { value, label }
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  required = false,
  className = "",
  name = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch(""); // Reset search on close
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  
  // Filter options based on search query
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`relative w-full ${className}`} ref={wrapperRef}>
      {/* Hidden select for native form validation compatibility */}
      <select 
        value={value || ""} 
        onChange={() => {}} 
        required={required}
        name={name}
        className="hidden"
      >
        <option value="" disabled></option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      {/* Select Box */}
      <div
        className={`w-full bg-surface-container-lowest rounded-lg border px-md py-3 flex items-center justify-between transition-all ${
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${isOpen ? "border-primary ring-2 ring-primary/20" : "border-primary/30"}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`font-body-lg truncate ${!selectedOption ? "text-on-surface-variant/70" : "text-on-surface"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <MdExpandMore 
          size={20} 
          className={`text-on-surface-variant shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-surface border border-outline-variant rounded-lg shadow-xl max-h-72 flex flex-col overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-outline-variant bg-surface sticky top-0">
            <input
              type="text"
              autoFocus
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-md px-3 py-2 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-on-surface-variant/50"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* Options List */}
          <ul className="overflow-y-auto p-1 flex-1">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-4 text-on-surface-variant text-body-sm text-center italic">
                No results found
              </li>
            ) : (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={`px-3 py-2.5 my-0.5 text-body-md rounded-md cursor-pointer flex justify-between items-center transition-colors ${
                    value === opt.value 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  {value === opt.value && <MdCheck size={18} className="text-primary shrink-0" />}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
