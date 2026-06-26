// ============================================================
// SubjectField.jsx
// Controlled subject input using Formik Field.
// Shows validation error below the input.
// ============================================================

import { Field, ErrorMessage } from "formik";

export default function SubjectField() {
  return (
    <div className="flex flex-col gap-sm">
      {/* Label */}
      <label
        htmlFor="subject"
        className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
      >
        Subject
      </label>

      {/* Input */}
      <Field
        id="subject"
        name="subject"
        type="text"
        placeholder="Brief summary of the issue"
        className="w-full bg-surface-container-low focus:bg-surface-container-lowest
          border border-transparent focus:border-primary
          rounded-lg px-md py-3 font-body-md text-body-md text-on-surface
          transition-all outline-none placeholder:text-outline"
      />

      {/* Validation error */}
      <ErrorMessage
        name="subject"
        component="p"
        className="text-error font-body-md text-body-md"
      />
    </div>
  );
}
