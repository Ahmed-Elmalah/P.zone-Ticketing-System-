// ============================================================
// NotFound.jsx
// 404 page — shown when the user hits a route that doesn't exist
// ============================================================

import { useNavigate } from "react-router-dom";
import { MdSearchOff, MdArrowBack } from "react-icons/md";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center gap-lg bg-background text-on-background font-body-md">
      {/* Icon */}
      <MdSearchOff size={80} className="text-outline-variant" />

      {/* Text */}
      <div className="flex flex-col items-center gap-sm text-center">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          404 — Page Not Found
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
          The page you're looking for doesn't exist or you don't have permission
          to access it.
        </p>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-sm px-lg py-sm bg-primary text-on-primary rounded-lg font-button-text text-button-text hover:bg-on-primary-fixed-variant transition-colors"
      >
        <MdArrowBack size={20} />
        Go Back
      </button>
    </div>
  );
}
