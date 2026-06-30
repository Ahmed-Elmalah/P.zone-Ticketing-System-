// ============================================================
// UserDetailsForm.jsx
// Reuses AddUser components in view/edit mode.
// - View mode: all fields disabled (read-only)
// - Edit mode: all fields enabled and editable
//
// No password fields — password changes need a separate flow.
//
// Props:
//   user        - user object from Strapi
//   isEditing   - boolean (controlled by parent)
//   onSubmitDone - called after successful save
// ============================================================

import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import PersonalInfoFields from "../addUser/PersonalInfoFields";
import RoleAssignment from "../addUser/RoleAssignment";
import AccountStatusToggle from "../addUser/AccountStatusToggle";

const Divider = () => <div className="h-px bg-outline-variant w-full" />;

// ── Validation — same as AddUser but no password fields ──────
const EditUserSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  laptopNumber: Yup.string().required("Laptop number is required"),
  role: Yup.string().required("Please select a role"),
  isActive: Yup.boolean(),
});

export default function UserDetailsForm({
  user = {},
  isEditing = false,
  onSubmitDone,
}) {
  // Build initial values from the user object coming from Strapi
  const initialValues = {
    fullName: user?.username || "",
    email: user?.email || "",
    laptopNumber: user?.deviceNumber || "",
    role: user?.role?.id || "",
    isActive: user?.blocked !== true, // Strapi uses "blocked" to disable users
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { userRepo } = await import("../../../api/userRepo");
      
      const updateData = {
        username: values.fullName,
        email: values.email,
        deviceNumber: values.laptopNumber,
        role: values.role,
        blocked: !values.isActive
      };

      await userRepo.updateUser(user.id, updateData);
      toast.success("User updated successfully.");
      onSubmitDone?.();
    } catch (err) {
      const message = err?.response?.data?.error?.message || "Update failed.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EditUserSchema}
      onSubmit={handleSubmit}
      enableReinitialize // re-fill when user prop changes
    >
      {({ values, setFieldValue }) => (
        // id="user-details-form" lets the Save button in the header submit this form
        <Form id="user-details-form">
          <div className="p-lg flex flex-col gap-xl">
            {/* Name, email, department, job title */}
            <PersonalInfoFields disabled={!isEditing} />

            <Divider />

            {/* Role selection */}
            <RoleAssignment
              selectedRole={values.role}
              onChange={setFieldValue}
              disabled={!isEditing}
            />

            <Divider />

            {/* Active / inactive toggle */}
            <AccountStatusToggle
              isActive={values.isActive}
              onChange={setFieldValue}
              disabled={!isEditing}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
