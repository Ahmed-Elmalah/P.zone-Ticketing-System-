// ============================================================
// AddUserForm.jsx
// Formik form that assembles all add-user sections.
// Handles validation (Yup), submission, and cancel navigation.
//
// On submit: calls createStaffAccount from useLogin
// which registers the user and assigns the selected role in Strapi.
// ============================================================

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import toast from "react-hot-toast";

import PersonalInfoFields, { PasswordFields } from "./PersonalInfoFields";
import RoleAssignment from "./RoleAssignment";
import AccountStatusToggle from "./AccountStatusToggle";

// Divider reused between sections
const Divider = () => <div className="h-px bg-outline-variant w-full" />;

// ── Validation schema ────────────────────────────────────────
const AddUserSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  laptopNumber: Yup.string().required("Laptop number is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm the password"),
  role: Yup.string().required("Please select a role"),
  isActive: Yup.boolean(),
});

// ── Initial values ───────────────────────────────────────────
const initialValues = {
  fullName: "",
  email: "",
  laptopNumber: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  role: "", // Changed from "help" to empty string to force selection
  isActive: true,
};

// ── Component ────────────────────────────────────────────────
export default function AddUserForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { userRepo } = await import("../../../api/userRepo");
      
      const newUserData = {
        username: values.fullName,
        email: values.email,
        password: values.password,
        deviceNumber: values.laptopNumber,
        phoneNumber: values.phoneNumber,
        role: values.role, // role ID from RoleAssignment
        blocked: !values.isActive,
        confirmed: true // usually required to bypass email confirmation
      };

      await userRepo.createUser(newUserData);

      toast.success("Account created! Invite sent.");
      navigate("/admin/users");
    } catch (err) {
      const message =
        err?.response?.data?.error?.message || "Failed to create account.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddUserSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          {/* Form body */}
          <div className="p-lg flex flex-col gap-xl">
            {/* Personal info: name, email, department, job title */}
            <PersonalInfoFields />

            {/* Password + confirm password */}
            <PasswordFields />

            <Divider />

            {/* Role selection */}
            <RoleAssignment
              selectedRole={values.role}
              onChange={setFieldValue}
            />

            <Divider />

            {/* Account active toggle */}
            <AccountStatusToggle
              isActive={values.isActive}
              onChange={setFieldValue}
            />
          </div>

          {/* Form footer */}
          <div
            className="p-lg bg-surface border-t border-outline-variant
            flex justify-end gap-md items-center"
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="font-button-text text-button-text text-on-surface-variant
                px-lg py-sm border border-outline-variant rounded-lg
                hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="font-button-text text-button-text text-on-primary bg-primary
                px-lg py-sm rounded-lg hover:opacity-90 transition-opacity
                flex items-center gap-sm shadow-sm
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters
                    size={16}
                    className="animate-spin"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <MdSend size={16} />
                  Create &amp; Send Invite
                </>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
