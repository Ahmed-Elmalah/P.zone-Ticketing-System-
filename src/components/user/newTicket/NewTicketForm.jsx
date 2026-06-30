// ============================================================
// NewTicketForm.jsx
// Handles ticket creation with priority, category, attachments.
// Uploads files to Strapi /upload first, then links IDs to ticket.
// ============================================================

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdExpandMore, MdCloudUpload, MdInsertDriveFile, MdClose } from "react-icons/md";

import SubjectField from "./SubjectField";
import CategoryField from "./CategoryField";
import DescriptionField from "./DescriptionField";

import useTicketStore from "../../../store/useTicketStore";
import { useAuthStore } from "../../../auth/authStore";
import axiosInstance from "../../../api/axiosConfig";

// ── Validation schema ─────────────────────────────────────────
const NewTicketSchema = Yup.object({
  subject: Yup.string()
    .min(5, "Subject must be at least 5 characters")
    .required("Subject is required"),
  category: Yup.string().required("Please select a category"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  priority: Yup.string().required("Please select a priority"),
});

const initialValues = {
  subject: "",
  category: "",
  description: "",
  priority: "Low",
};

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

// ── Upload files to Strapi /upload, returns array of file IDs ─
const uploadFiles = async (files) => {
  if (!files.length) return [];
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  const res = await axiosInstance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.map((f) => f.id);
};

// ── Component ─────────────────────────────────────────────────
export default function NewTicketForm() {
  const navigate = useNavigate();
  const { addTicket } = useTicketStore();
  const { user } = useAuthStore();

  // File state — managed outside Formik
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const valid = Array.from(newFiles).filter(
      (f) => f.size <= MAX_SIZE && !files.find((ex) => ex.name === f.name)
    );
    setFiles((prev) => [...prev, ...valid]);
  };
  const removeFile = (name) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // 1. Upload attachments first (if any)
      const attachmentIds = await uploadFiles(files);

      // 2. Create the ticket with all fields
      await addTicket({
        subject: values.subject,
        description: values.description,
        priority: values.priority,
        state: "Open",                    // default state (field is 'state' in Strapi)
        category: values.category,         // documentId of selected category
        creator: user?.id,                 // current logged-in user
        ...(attachmentIds.length > 0 && { attachments: attachmentIds }),
      });

      resetForm();
      setFiles([]);
      navigate("/user/tickets");
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
          <SubjectField />
          <CategoryField />

          {/* Priority Field */}
          <div className="flex flex-col gap-sm">
            <label
              htmlFor="priority"
              className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
            >
              Priority
            </label>
            <div className="relative">
              <Field
                as="select"
                id="priority"
                name="priority"
                className="w-full bg-surface-container-low focus:bg-surface-container-lowest
                  border border-transparent focus:border-primary rounded-lg px-md py-3
                  font-body-md text-body-md text-on-surface transition-all outline-none
                  appearance-none cursor-pointer"
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Field>
              <MdExpandMore
                size={20}
                className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
              />
            </div>
            <ErrorMessage
              name="priority"
              component="p"
              className="text-error font-body-md text-body-md"
            />
          </div>

          <DescriptionField />

          {/* Attachments Zone */}
          <div className="flex flex-col gap-sm">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Attachments
            </span>
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
              className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center
                justify-center cursor-pointer group transition-all
                ${isDragging
                  ? "border-primary bg-surface-container-low"
                  : "border-outline-variant bg-surface-container-low hover:bg-surface-container-lowest hover:border-primary"
                }`}
            >
              <div className="h-16 w-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <MdCloudUpload size={32} />
              </div>
              <p className="font-body-md text-body-md font-semibold text-on-surface mb-xs">
                Click to upload or drag and drop
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                PNG, JPG, PDF (max. 10MB)
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.pdf,.svg"
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>

            {/* Selected files list */}
            {files.length > 0 && (
              <ul className="flex flex-col gap-xs mt-xs">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between px-md py-sm bg-surface-container-low rounded-lg border border-outline-variant"
                  >
                    <div className="flex items-center gap-sm text-on-surface">
                      <MdInsertDriveFile size={18} className="text-primary" />
                      <span className="font-body-md text-body-md truncate max-w-xs">{file.name}</span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(file.name); }}
                      className="text-on-surface-variant hover:text-error transition-colors"
                    >
                      <MdClose size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-md pt-lg border-t border-outline-variant mt-sm">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-lg py-sm rounded-lg font-button-text text-button-text text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-on-primary px-xl py-sm rounded-lg font-button-text
                text-button-text hover:bg-on-primary-fixed-variant transition-colors shadow-sm
                flex items-center gap-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters size={16} className="animate-spin" />
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
