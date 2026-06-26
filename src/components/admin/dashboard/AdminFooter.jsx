import React from "react";

export default function AdminFooter() {
  return (
    <footer className="w-full py-lg px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant mt-auto">
      <div className="flex items-center gap-lg">
        <span className="font-button-text text-button-text text-on-surface">
          P.ZONE Analytics
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant dark:text-outline">
          © 2026 P.ZONE Analytics. All rights reserved.
        </span>
      </div>
      <div className="flex items-center gap-xl">
        {["Privacy Policy", "Terms of Service", "API Documentation"].map(
          (link, i) => (
            <a
              key={i}
              href="#"
              className="font-label-md text-label-md text-on-surface-variant dark:text-outline hover:text-primary underline transition-all"
            >
              {link}
            </a>
          ),
        )}
      </div>
    </footer>
  );
}
