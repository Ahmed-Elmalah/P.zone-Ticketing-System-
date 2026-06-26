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
      <div className="w-full max-w-120 bg-surface-container-lowest rounded-2xl shadow-xl p-lg md:p-xl flex flex-col gap-xl border border-surface-container-high">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>

    </div>
  );
}