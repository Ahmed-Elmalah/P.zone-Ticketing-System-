// ============================================================
// CategoryField.jsx
// Dropdown select for ticket category using Formik Field.
// Add/remove categories from the CATEGORIES array below.
// ============================================================

import { Field, ErrorMessage } from "formik";
import { MdExpandMore } from "react-icons/md";
import { useEffect } from "react";
import useAdminStore from "../../../store/useAdminStore";

export default function CategoryField() {
  const { categories, fetchCategories, isLoadingCategories } = useAdminStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="flex flex-col gap-sm">
      {/* Label */}
      <label
        htmlFor="category"
        className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
      >
        Category
      </label>

      {/* Select wrapper — relative for the chevron icon */}
      <div className="relative">
        <Field
          as="select"
          id="category"
          name="category"
          className="w-full bg-surface-container-low focus:bg-surface-container-lowest
            border border-transparent focus:border-primary
            rounded-lg px-md py-3 font-body-md text-body-md text-on-surface
            transition-all outline-none appearance-none cursor-pointer"
          disabled={isLoadingCategories}
        >
          {/* Default placeholder option */}
          <option value="" disabled>
            {isLoadingCategories ? "Loading categories..." : "Select a category"}
          </option>

          {/* Dynamic options */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.documentId || cat.id}>
              {cat.name}
            </option>
          ))}
        </Field>

        {/* Chevron icon — pointer-events-none so it doesn't block clicks */}
        <MdExpandMore
          size={20}
          className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
        />
      </div>

      {/* Validation error */}
      <ErrorMessage
        name="category"
        component="p"
        className="text-error font-body-md text-body-md"
      />
    </div>
  );
}
