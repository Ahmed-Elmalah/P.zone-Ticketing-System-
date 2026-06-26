// ============================================================
// LoginHeader.jsx
// The top section of the login card:
// icon + title + subtitle
// ============================================================

import { MdShield } from "react-icons/md";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-sm">
      {/* App icon */}
      <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-sm">
        <MdShield size={28} />
      </div>

      {/* Title */}
      <h1 className="font-headline-lg text-headline-lg text-on-surface">
        Welcome Back
      </h1>

      {/* Subtitle */}
      <p className="font-body-md text-body-md text-on-surface-variant">
        Sign in to continue to the Help Desk System.
      </p>
    </div>
  );
}
