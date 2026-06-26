import React from "react";
import { MdTrendingUp } from "react-icons/md";

export default function KpiGrid() {
  // KPI Data source
  const kpis = [
    {
      title: "Total Tickets",
      value: "1,284",
      badgeText: "+12%",
      badgeType: "success",
      iconFilter:
        "brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(3020%) hue-rotate(215deg) brightness(95%) contrast(104%)",
      iconBg: "bg-primary-container/10",
    },
    {
      title: "Avg Resolution Time",
      value: "2.4 Hours",
      badgeText: "Target: 3h",
      badgeType: "neutral",
      iconFilter:
        "brightness(0) saturate(100%) invert(32%) sepia(74%) saturate(628%) hue-rotate(114deg) brightness(96%) contrast(101%)",
      iconBg: "bg-secondary-container/10",
    },
    {
      title: "Open IT Issues",
      value: "42",
      badgeText: "High Priority",
      badgeType: "danger",
      iconFilter:
        "brightness(0) saturate(100%) invert(24%) sepia(99%) saturate(1814%) hue-rotate(15deg) brightness(95%) contrast(101%)",
      iconBg: "bg-tertiary-container/10",
    },
    {
      title: "Active Agents",
      value: "15",
      badgeText: "Active Now",
      badgeType: "neutral",
      iconFilter:
        "brightness(0) saturate(100%) invert(30%) sepia(10%) saturate(1400%) hue-rotate(190deg) brightness(90%) contrast(85%)",
      iconBg: "bg-surface-container-high",
    },
  ];

  const getBadgeStyle = (type) => {
    switch (type) {
      case "success":
        return "text-secondary bg-secondary-container/20";
      case "danger":
        return "text-error bg-error-container/30";
      default:
        return "text-on-surface-variant bg-surface-container-high";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
        {kpis.map((item, index) => (
          <div
            key={index}
            className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between"
          >
            {/* Card Header: Icon & Badge */}
            <div className="flex justify-between items-start mb-md">
              <div className={`p-sm rounded-lg ${item.iconBg}`}>
                <img
                  alt={item.title}
                  className="w-8 h-8 object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAACmQBoxVCCIPg67uyZwxMM4Li0abAATmkOphEscXn6TF7o-uGdtjMXlFBJi6yvQIN4agC8Upyfwa0PRsH03SzvEfh-3m7k0ogsKZgsXtXWZm3DL0ToIKErxdCjELI5GrXaDVLV1h_YURn8Q5h7JLunFbY_0_adnEfHmD5JtAVuSE2DgCZVGrrIH3AcDzj2a7KDLOMPgISLUzCi2R9ef2P-3Joi2xUuHbwQd-pa8cdaGwhLIojUAL21Q91EVcK6_ErxesZyIIvQxk"
                  style={{ filter: item.iconFilter }}
                />
              </div>

              <span
                className={`font-label-md px-2 py-1 rounded-full flex items-center gap-1 ${getBadgeStyle(item.badgeType)}`}
              >
                {item.badgeType === "success" && <MdTrendingUp size={14} />}
                {item.badgeText}
              </span>
            </div>

            {/* Card Body */}
            <div>
              <p className="font-label-md text-label-md text-outline uppercase tracking-wider mb-xs">
                {item.title}
              </p>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
