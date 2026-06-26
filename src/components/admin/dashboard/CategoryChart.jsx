import React from "react";

export default function CategoryChart() {
  const bars = [
    { label: "Hardware", height: "85%", value: "425" },
    { label: "Software", height: "60%", value: "310" },
    { label: "Network", height: "40%", value: "185" },
    { label: "Access", height: "75%", value: "360" },
    { label: "Other", height: "25%", value: "112" },
  ];

  return (
    <div className="xl:col-span-2 bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-xl">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Tickets by IT Category
          </h2>
          <p className="font-body-md text-body-md text-outline">
            Volume distribution across technical departments
          </p>
        </div>
        <select className="bg-surface-container-low border-none rounded-lg text-label-md font-label-md text-on-surface-variant focus:ring-2 focus:ring-primary outline-none px-md py-sm">
          <option>Current Week</option>
          <option>Last Week</option>
        </select>
      </div>

      {/* Chart Canvas (Replaced raw numbers pt-12/pb-8 with your tokens pt-2xl/pb-xl) */}
      <div className="relative h-90 w-full flex items-end justify-between gap-lg pt-2xl pb-xl border-b border-outline-variant mt-auto">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-xl pt-2xl">
          {["500", "400", "300", "200", "100"].map((val, i) => (
            <div
              key={i}
              className="w-full border-t border-outline-variant/30 relative"
            >
              <span className="absolute -left-8 -top-2 text-label-md text-outline">
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Bars */}
        {bars.map((bar, idx) => (
          <div
            key={idx}
            className="group relative flex-1 bg-primary/10 rounded-t-lg transition-all hover:bg-primary/20 flex items-end justify-center cursor-help"
            style={{ height: bar.height }}
          >
            <div className="w-2/3 bg-primary rounded-t-lg h-full relative">
              <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-3 py-1 rounded text-label-md whitespace-nowrap transition-opacity shadow-lg z-20">
                {bar.value} Tickets
              </div>
            </div>
            <span className="absolute -bottom-8 text-label-md font-label-md text-on-surface-variant">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
