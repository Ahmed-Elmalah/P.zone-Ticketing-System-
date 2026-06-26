// ============================================================
// LoginFooter.jsx
// Bottom section of the login card — help/support text
// ============================================================

export default function LoginFooter() {
  return (
    <div className="text-center pt-md border-t border-surface-container-high">
      <p className="font-body-md text-body-md text-on-surface-variant">
        Need help accessing your account?{" "}
        <br className="md:hidden" />
        <a
          href="mailto:support@company.com"
          className="font-label-md text-label-md text-primary hover:underline transition-all"
        >
          Contact IT Support
        </a>
      </p>
    </div>
  );
}