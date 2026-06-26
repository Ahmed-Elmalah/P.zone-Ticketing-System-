// ============================================================
// DescriptionField.jsx
// Resizable textarea for the ticket description.
// Uses Formik Field + Yup validation error display.
// ============================================================

import { Field, ErrorMessage } from "formik";

export default function DescriptionField() {
  return (
    <div className="flex flex-col gap-sm">
      {/* Label */}
      <label
        htmlFor="description"
        className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
      >
        Description
      </label>

      {/* Textarea */}
      <Field
        as="textarea"
        id="description"
        name="description"
        rows={5}
        placeholder="Please describe your issue in detail..."
        className="w-full bg-surface-container-low focus:bg-surface-container-lowest
          border border-transparent focus:border-primary
          rounded-lg px-md py-3 font-body-md text-body-md text-on-surface
          transition-all outline-none resize-y placeholder:text-outline"
      />

      {/* Validation error */}
      <ErrorMessage
        name="description"
        component="p"
        className="text-error font-body-md text-body-md"
      />
    </div>
  );
}
