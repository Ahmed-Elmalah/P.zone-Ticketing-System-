// ============================================================
// HelpfulLinks.jsx
// Card with helpful external links for the user.
// ============================================================

import { MdMenuBook, MdChat } from "react-icons/md";

// Add or remove links here anytime
const links = [
  { icon: MdMenuBook, label: "Browse Knowledge Base", href: "#" },
  { icon: MdChat,     label: "Chat with Support",     href: "#" },
];

export default function HelpfulLinks() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant
      p-lg flex flex-col gap-md grow">

      <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">
        Helpful Links
      </h3>

      <div className="flex flex-col gap-sm">
        {links.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="text-primary hover:text-surface-tint transition-colors
              font-body-md text-body-md flex items-center gap-sm"
          >
            <Icon size={18} />
            {label}
          </a>
        ))}
      </div>

    </div>
  );
}