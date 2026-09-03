// ============================================================
// CategoryField.jsx
// Dropdown select for ticket category using Formik Field.
// Add/remove categories from the CATEGORIES array below.
// ============================================================

import { useFormikContext, ErrorMessage } from "formik";
import { useEffect } from "react";
import useAdminStore from "../../../store/useAdminStore";
import CustomDropdown from "../../shared/CustomDropdown";

export default function CategoryField() {
  const { categories, fetchCategories, isLoadingCategories } = useAdminStore();
  const { values, setFieldValue } = useFormikContext();

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

      {/* Custom Dropdown wrapper */}
      <div className="relative">
        <CustomDropdown
          variant="form"
          searchable={true}
          disabled={isLoadingCategories}
          placeholder={isLoadingCategories ? "Loading categories..." : "Select a category"}
          value={values.category}
          onChange={(val) => setFieldValue("category", val)}
          options={categories.map((cat) => ({
            value: cat.documentId || cat.id,
            label: cat.name,
          }))}
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
