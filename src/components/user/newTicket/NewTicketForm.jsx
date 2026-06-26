// ============================================================
// NewTicketForm.jsx
// Formik form wrapper that assembles all ticket form fields.
// Handles validation (Yup), submission, and cancel navigation.
// ============================================================

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import SubjectField from "./SubjectField";
import CategoryField from "./CategoryField";
import DescriptionField from "./DescriptionField";
import AttachmentsZone from "./AttachmentsZone";

// ── Validation schema ────────────────────────────────────────
const NewTicketSchema = Yup.object({
  subject: Yup.string()
    .min(5, "Subject must be at least 5 characters")
    .required("Subject is required"),

  category: Yup.string().required("Please select a category"),

  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
});

// ── Initial values ───────────────────────────────────────────
const initialValues = {
  subject: "",
  category: "",
  description: "",
};

// ── Component ────────────────────────────────────────────────
export default function NewTicketForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // TODO: replace with Strapi API call
      // await TicketRepo.createTicket(values, jwt);
      console.log("New ticket:", values);

      resetForm();
      navigate("/user/tickets"); // go to tickets list after submit
    } catch (err) {
      console.error("Failed to submit ticket:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewTicketSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-lg">
          {/* Form fields */}
          <SubjectField />
          <CategoryField />
          <DescriptionField />
          <AttachmentsZone />

          {/* ── Footer actions ── */}
          <div className="flex items-center justify-end gap-md pt-lg border-t border-outline-variant mt-sm">
            {/* Cancel — goes back to previous page */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-lg py-sm rounded-lg font-button-text text-button-text
                text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-on-primary px-xl py-sm rounded-lg
                font-button-text text-button-text hover:bg-on-primary-fixed-variant
                transition-colors shadow-sm flex items-center gap-sm
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters
                    size={16}
                    className="animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                "Submit Ticket"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
