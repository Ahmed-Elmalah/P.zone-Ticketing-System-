// ============================================================
// PriorityField.jsx
// Dropdown select for ticket priority using CustomDropdown with Formik.
// ============================================================

import React from "react";
import { useFormikContext, ErrorMessage } from "formik";
import CustomDropdown from "../../shared/CustomDropdown";

const PRIORITY_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];

export default function PriorityField() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="flex flex-col gap-sm">
      {/* Label */}
      <label
        htmlFor="priority"
        className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
      >
        Priority
      </label>

      {/* Custom Dropdown wrapper */}
      <div className="relative">
        <CustomDropdown
          variant="form"
          searchable={false}
          value={values.priority}
          onChange={(val) => setFieldValue("priority", val)}
          options={PRIORITY_OPTIONS}
        />
      </div>

      {/* Validation error */}
      <ErrorMessage
        name="priority"
        component="p"
        className="text-error font-body-md text-body-md"
      />
    </div>
  );
}
