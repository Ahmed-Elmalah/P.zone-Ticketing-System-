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
              className="font-label-md text-label-md text-on-surface"
            >
              Email Address
            </label>
            <div className="relative">
              {/* Left icon */}
              <MdEmail
                size={20}
                className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant"
              />

              <Field
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                className={`w-full bg-surface-container-low border rounded-lg py-3 pl-12 pr-md
                  text-on-surface placeholder:text-outline-variant
                  focus:ring-2 focus:ring-primary transition-shadow
                  font-body-md text-body-md
                  ${errors.email && touched.email ? "border-error" : "border-transparent"}`}
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
              className="font-label-md text-label-md text-on-surface"
            >
              Password
            </label>
            <div className="relative">
              {/* Left icon */}
              <MdLock
                size={20}
                className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant"
              />

              <Field
                id="password"
                name="password"
                type={!showPass ? "password" : "text"}
                placeholder="••••••••"
                className={`w-full bg-surface-container-low border rounded-lg py-3 pl-12 pr-md
                  text-on-surface placeholder:text-outline-variant
                  focus:ring-2 focus:ring-primary transition-shadow
                  font-body-md text-body-md
                  ${errors.password && touched.password ? "border-error" : "border-transparent"}`}
              />

              {showPass ? (
                <FaEyeSlash
                  onClick={() => setShowPass(false)}
                  className="absolute cursor-pointer right-md top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPass(true)}
                  className="absolute cursor-pointer right-md top-1/2 -translate-y-1/2 text-on-surface-variant"
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

          {/* ── Remember Me + Forgot Password ── */}
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

            <a
              href="#"
              className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* ── Submit Button ── */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-on-primary-fixed-variant disabled:opacity-60 disabled:cursor-not-allowed
              text-on-primary font-button-text text-button-text
              py-3 rounded-lg shadow-sm hover:shadow transition-all mt-sm
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
