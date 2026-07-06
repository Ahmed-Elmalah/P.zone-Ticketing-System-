// ============================================================
// LoginHeader.jsx
// The top section of the login card:
// icon + title + subtitle
// ============================================================

import Logo from "../../../assets/P.zone-LogoBlack-Version-01-2048x753.png";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-sm">
      {/* App logo */}
      <img src={Logo} alt="P.ZONE TICKETING SYSTEM" className="h-12 object-contain mb-sm" />

      {/* Title */}
      <h1 className="font-headline-lg text-headline-lg text-on-surface">
        P.ZONE TICKETING SYSTEM
      </h1>

      {/* Subtitle */}
      <p className="font-body-md text-body-md text-on-surface-variant">
        Sign in to continue to the Help Desk System.
      </p>
    </div>
  );
}
