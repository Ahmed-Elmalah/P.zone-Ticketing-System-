// ============================================================
// LoginPage.jsx
// Assembles the login card from its sub-components.
// This is the only file you import in the router.
// ============================================================

import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import LoginFooter from "./components/LoginFooter";

export default function LoginPage() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop antialiased">

      {/* Login Card */}
      <div className="w-full max-w-120 bg-surface-container-lowest rounded-2xl glass-card p-lg md:p-xl flex flex-col gap-xl border border-surface-container-high relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#712ae2] rounded-t-2xl" />
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>

    </div>
  );
}