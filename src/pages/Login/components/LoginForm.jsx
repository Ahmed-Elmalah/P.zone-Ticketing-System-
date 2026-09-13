// ============================================================
// LoginForm.jsx
// The login form — built with Formik + Yup.
// Handles validation, submission, and error display.
// Calls useLogin hook to authenticate with Strapi.
// ============================================================

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdEmail, MdLock, MdArrowForward } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useLogin from "../../../auth/useLogin";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

// ── Validation Schema ────────────────────────────────────────
const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),

  rememberMe: Yup.boolean(),
});

// ── Initial Values ───────────────────────────────────────────
const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

// ── Component ────────────────────────────────────────────────
export default function LoginForm() {
  const { login } = useLogin();
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login(values);

      // If rememberMe is checked, move token to localStorage (persists after browser close)
      if (values.rememberMe) {
        const token = sessionStorage.getItem("jwt-token");
        const userInfo = sessionStorage.getItem("user-info");
        if (token) localStorage.setItem("jwt-token", token);
        if (userInfo) localStorage.setItem("user-info", userInfo);
      }
    } catch (err) {
      // Show Strapi's error message under the password field
      const message =
        err?.response?.data?.error?.message ||
        "Invalid email or password. Please try again.";
      // setFieldError("password", message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-lg">
          {/* ── Email Field ── */}
          <div className="flex flex-col gap-xs">
            <label
              htmlFor="email"
              className="font-label-md text-label-md text-on-surface uppercase tracking-wider"
            >
              Email Address
            </label>
            <div className="relative">
              {/* Left icon */}
              <MdEmail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none z-10"
              />

              <Field
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                className={`w-full bg-surface-container-low border rounded-xl py-3 !pl-12 !pr-4
                  text-on-surface placeholder:text-outline-variant
                  focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
                  font-body-md text-body-md
                  ${errors.email && touched.email ? "border-error" : "border-outline-variant"}`}
              />
            </div>

            {/* Validation error */}
            <ErrorMessage
              name="email"
              component="p"
              className="text-error font-body-md text-body-md"
            />
          </div>

          {/* ── Password Field ── */}
          <div className="flex flex-col gap-xs">
            <label
              htmlFor="password"
              className="font-label-md text-label-md text-on-surface uppercase tracking-wider"
            >
              Password
            </label>
            <div className="relative">
              {/* Left icon */}
              <MdLock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none z-10"
              />

              <Field
                id="password"
                name="password"
                type={!showPass ? "password" : "text"}
                placeholder="••••••••"
                className={`w-full bg-surface-container-low border rounded-xl py-3 !pl-12 !pr-12
                  text-on-surface placeholder:text-outline-variant
                  focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
                  font-body-md text-body-md
                  ${errors.password && touched.password ? "border-error" : "border-outline-variant"}`}
              />

              {showPass ? (
                <FaEyeSlash
                  onClick={() => setShowPass(false)}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 hover:text-primary transition-colors"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPass(true)}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 hover:text-primary transition-colors"
                />
              )}
            </div>

            {/* Validation error */}
            <ErrorMessage
              name="password"
              component="p"
              className="text-error font-body-md text-body-md"
            />
          </div>

          {/* ── Remember Me ── */}
          <div className="flex items-center justify-between mt-[-8px]">
            <div className="flex items-center gap-sm">
              <Field
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-low w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="font-body-md text-body-md text-on-surface-variant cursor-pointer select-none"
              >
                Remember Me
              </label>
            </div>
          </div>

          {/* ── Submit Button ── */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-extrabold text-button-text
              py-3 rounded-xl shadow-[0_2px_8px_rgba(79,70,229,0.25)] hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.99] transition-all mt-sm
              flex items-center justify-center gap-sm"
          >
            {/* Show loading spinner while waiting for API response */}
            {isSubmitting ? (
              <>
                <AiOutlineLoading3Quarters size={18} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <MdArrowForward size={18} />
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
