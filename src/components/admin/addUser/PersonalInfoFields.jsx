// ============================================================
// PersonalInfoFields.jsx
// Two-column grid for the employee's basic info fields.
// Uses Formik Field + ErrorMessage for validation.
//
// Add/remove departments in the DEPARTMENTS array below.
// ============================================================

import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { MdExpandMore, MdVisibility, MdVisibilityOff } from "react-icons/md";

// Edit departments here without touching the component logic
const DEPARTMENTS = [
  { value: "it", label: "IT Support" },
  { value: "hr", label: "Human Resources" },
  { value: "engineering", label: "Engineering" },
  { value: "sales", label: "Sales" },
];

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

export default function PersonalInfoFields() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      {/* ── Left column ── */}
      <div className="flex flex-col gap-lg">
        <FormField label="Full Name" name="fullName">
          <Field
            name="fullName"
            type="text"
            placeholder="Jane Doe"
            className={inputClass}
          />
        </FormField>

        <FormField label="Email Address" name="email">
          <Field
            name="email"
            type="email"
            placeholder="jane.doe@company.com"
            className={inputClass}
          />
        </FormField>
      </div>

      {/* ── Right column ── */}
      <div className="flex flex-col gap-lg">
        <FormField label="Department" name="department">
          <div className="relative">
            <Field
              as="select"
              name="department"
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">Select Department...</option>
              {DEPARTMENTS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Field>
            <MdExpandMore
              size={20}
              className="absolute right-md top-1/2 -translate-y-1/2 text-outline pointer-events-none"
            />
          </div>
        </FormField>

        <FormField label="Job Title" name="jobTitle">
          <Field
            name="jobTitle"
            type="text"
            placeholder="e.g. Support Technician"
            className={inputClass}
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
