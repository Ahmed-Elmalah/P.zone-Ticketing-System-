// ============================================================
// PersonalInfoFields.jsx
// Two-column grid for the employee's basic info fields.
// Uses Formik Field + ErrorMessage for validation.
// ============================================================

import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// Reusable input wrapper with label + error
function FormField({ label, name, children }) {
  return (
    <div className="flex flex-col gap-sm">
      <label className="font-label-md text-label-md text-on-surface">
        {label}
      </label>
      {children}
      <ErrorMessage
        name={name}
        component="p"
        className="text-error font-body-md text-body-md"
      />
    </div>
  );
}

const inputClass = `w-full bg-surface border border-outline-variant rounded-lg
  px-md py-sm font-body-md text-body-md text-on-surface
  focus:outline-none focus:ring-2 focus:ring-primary transition-shadow`;

// Password input with show/hide toggle
function PasswordField({ name, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Field
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={`${inputClass} pr-11`}
      />
      {/* Toggle visibility button */}
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant
          hover:text-primary transition-colors"
      >
        {show ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
      </button>
    </div>
  );
}

export default function PersonalInfoFields({ disabled = false }) {
  const disabledClass = disabled
    ? "opacity-60 cursor-not-allowed bg-surface-container-low"
    : "";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      {/* ── Left column ── */}
      <div className="flex flex-col gap-lg">
        <FormField label="Full Name" name="fullName">
          <Field
            name="fullName"
            type="text"
            placeholder="Jane Doe"
            disabled={disabled}
            className={`${inputClass} ${disabledClass}`}
          />
        </FormField>
      </div>

      {/* ── Right column ── */}
      <div className="flex flex-col gap-lg">
        <FormField label="Email Address" name="email">
          <Field
            name="email"
            type="email"
            placeholder="jane.doe@company.com"
            disabled={disabled}
            className={`${inputClass} ${disabledClass}`}
          />
        </FormField>
      </div>

      {/* ── Full Width Laptop Number ── */}
      <div className="col-span-1 md:col-span-2">

        <FormField label="Laptop Number" name="laptopNumber">
          <Field
            name="laptopNumber"
            type="text"
            placeholder="e.g. LPT-001"
            disabled={disabled}
            className={`${inputClass} ${disabledClass}`}
          />
        </FormField>
      </div>
    </div>
  );
}

// ── Password section — separate row below the 2-col grid ────
export function PasswordFields() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      <FormField label="Password" name="password">
        <PasswordField name="password" placeholder="Min. 8 characters" />
      </FormField>

      <FormField label="Confirm Password" name="confirmPassword">
        <PasswordField name="confirmPassword" placeholder="Repeat password" />
      </FormField>
    </div>
  );
}
