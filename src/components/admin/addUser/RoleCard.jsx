// ============================================================
// RoleCard.jsx
// A single selectable role card with icon, label, and description.
// Highlights with primary border + bg when selected.
//
// Props:
//   value       - role value string (used by Formik)
//   label       - display name
//   description - short role description
//   icon        - react-icon component
//   isSelected  - whether this card is currently selected
//   onChange    - Formik's setFieldValue handler
// ============================================================

export default function RoleCard({
  value,
  label,
  description,
  icon: Icon,
  isSelected,
  onChange,
  disabled = false,
}) {
  return (
    <label
      onClick={() => !disabled && onChange("role", value)}
      className={`flex items-start gap-md p-md rounded-lg border transition-colors
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${
          isSelected
            ? "border-primary bg-surface-container-low"
            : `border-outline-variant ${!disabled ? "hover:bg-surface-container-low" : ""}`
        }`}
    >
      {/* Hidden radio input — Formik tracks value, not the input */}
      <input
        type="radio"
        name="role"
        value={value}
        checked={isSelected}
        disabled={disabled}
        onChange={() => !disabled && onChange("role", value)}
        className="w-4 h-4 text-primary bg-surface border-outline-variant
          focus:ring-primary focus:ring-2 mt-1 shrink-0"
      />

      {/* Icon + label + description */}
      <div className="flex-1">
        <div className="flex items-center gap-sm mb-xs">
          <Icon
            size={20}
            className={isSelected ? "text-primary" : "text-on-surface-variant"}
          />
          <span className="font-button-text text-button-text text-on-surface">
            {label}
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {description}
        </p>
      </div>
    </label>
  );
}
