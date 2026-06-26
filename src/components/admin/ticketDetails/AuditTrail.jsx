// ============================================================
// AuditTrail.jsx
// Right column (25%) of the admin ticket detail.
// Shows a vertical timeline of all ticket events.
//
// Props:
//   events - array of { time, description (JSX or string), isActive }
//            isActive = true → primary dot, false → gray dot
// ============================================================

export default function AuditTrail({ events = [] }) {
  return (
    <div
      className="lg:w-1/4 flex flex-col bg-surface border border-outline-variant
      rounded-xl shadow-sm overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="p-md border-b border-outline-variant bg-surface-container-lowest">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Audit Trail
        </h3>
      </div>

      {/* ── Timeline ── */}
      <div
        className="flex-1 overflow-y-auto p-md pl-lg relative
        max-h-[calc(100vh-260px)]"
      >
        {/* Vertical line running through all events */}
        <div className="absolute left-7 top-md bottom-md w-px bg-outline-variant" />

        <div className="flex flex-col gap-lg">
          {events.map((event, index) => (
            <div key={index} className="relative pl-xl">
              {/* Event dot — primary if active, gray if not */}
              <div
                className={`absolute -left-0.5 top-1 w-3 h-3 rounded-full z-10 outline-4 outline-surface
                  ${
                    event.isActive
                      ? "bg-primary"
                      : "bg-surface-variant border border-outline-variant"
                  }`}
              />

              {/* Event content */}
              <div className="flex flex-col gap-xs">
                <span className="font-label-md text-on-surface-variant text-[10px]">
                  {event.time}
                </span>
                {/* description can be a string or JSX with styled spans */}
                <p className="font-body-md text-on-surface text-sm">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
