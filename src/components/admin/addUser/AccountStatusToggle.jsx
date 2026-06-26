// ============================================================
// AccountStatusToggle.jsx
// Toggle switch for setting the new account's active status.
// Active = user can log in immediately after receiving invite.
//
// Props:
//   isActive  - boolean value from Formik
//   onChange  - Formik's setFieldValue
// ============================================================

export default function AccountStatusToggle({ isActive, onChange }) {
  return (
    <div className="flex items-center justify-between bg-surface p-md
      rounded-lg border border-outline-variant">

      {/* Label + description */}
      <div>
        <h4 className="font-button-text text-button-text text-on-surface mb-xs">
          Account Status
        </h4>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Active users can immediately log in upon receiving their invite.
        </p>
      </div>

      {/* Toggle switch */}
      <label className="flex items-center gap-sm cursor-pointer shrink-0 ml-lg">
        <div
          onClick={() => onChange("isActive", !isActive)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200
            ${isActive ? "bg-primary" : "bg-outline-variant"}`}
        >
          {/* Sliding thumb */}
          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full
            border border-outline-variant shadow-sm transition-all duration-200
            ${isActive ? "left-5.5" : "left-0.5"}`}
          />
        </div>
        <span className="font-label-md text-label-md text-on-surface">
          {isActive ? "Active" : "Inactive"}
        </span>
      </label>

    </div>
  );
}