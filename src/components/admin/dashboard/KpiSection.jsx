import React from "react";
import { MdTrendingUp } from "react-icons/md";

export default function KpiSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-2xl">
      {/* Total Tickets */}
      <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-3 bg-primary-container/10 rounded-lg">
            <img
              alt="icon"
              className="w-8 h-8 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAACmQBoxVCCIPg67uyZwxMM4Li0abAATmkOphEscXn6TF7o-uGdtjMXlFBJi6yvQIN4agC8Upyfwa0PRsH03SzvEfh-3m7k0ogsKZgsXtXWZm3DL0ToIKErxdCjELI5GrXaDVLV1h_YURn8Q5h7JLunFbY_0_adnEfHmD5JtAVuSE2DgCZVGrrIH3AcDzj2a7KDLOMPgISLUzCi2R9ef2P-3Joi2xUuHbwQd-pa8cdaGwhLIojUAL21Q91EVcK6_ErxesZyIIvQxk"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(3020%) hue-rotate(215deg) brightness(95%) contrast(104%)",
              }}
            />
          </div>
          <span className="text-secondary font-label-md bg-secondary-container/20 px-2 py-1 rounded-full flex items-center gap-1">
            <MdTrendingUp size={14} /> +12%
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-outline uppercase tracking-wider mb-1">
            Total Tickets
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            1,284
          </h3>
        </div>
      </div>

      {/* Avg Resolution */}
      <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-3 bg-secondary-container/10 rounded-lg">
            <img
              alt="icon"
              className="w-8 h-8 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAACmQBoxVCCIPg67uyZwxMM4Li0abAATmkOphEscXn6TF7o-uGdtjMXlFBJi6yvQIN4agC8Upyfwa0PRsH03SzvEfh-3m7k0ogsKZgsXtXWZm3DL0ToIKErxdCjELI5GrXaDVLV1h_YURn8Q5h7JLunFbY_0_adnEfHmD5JtAVuSE2DgCZVGrrIH3AcDzj2a7KDLOMPgISLUzCi2R9ef2P-3Joi2xUuHbwQd-pa8cdaGwhLIojUAL21Q91EVcK6_ErxesZyIIvQxk"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(32%) sepia(74%) saturate(628%) hue-rotate(114deg) brightness(96%) contrast(101%)",
              }}
            />
          </div>
          <span className="text-on-surface-variant font-label-md bg-surface-container-high px-2 py-1 rounded-full">
            Target: 3h
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-outline uppercase tracking-wider mb-1">
            Avg Resolution Time
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            2.4 Hours
          </h3>
        </div>
      </div>

      {/* Open IT Issues */}
      <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-3 bg-tertiary-container/10 rounded-lg">
            <img
              alt="icon"
              className="w-8 h-8 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAACmQBoxVCCIPg67uyZwxMM4Li0abAATmkOphEscXn6TF7o-uGdtjMXlFBJi6yvQIN4agC8Upyfwa0PRsH03SzvEfh-3m7k0ogsKZgsXtXWZm3DL0ToIKErxdCjELI5GrXaDVLV1h_YURn8Q5h7JLunFbY_0_adnEfHmD5JtAVuSE2DgCZVGrrIH3AcDzj2a7KDLOMPgISLUzCi2R9ef2P-3Joi2xUuHbwQd-pa8cdaGwhLIojUAL21Q91EVcK6_ErxesZyIIvQxk"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(24%) sepia(99%) saturate(1814%) hue-rotate(15deg) brightness(95%) contrast(101%)",
              }}
            />
          </div>
          <span className="text-error font-label-md bg-error-container/30 px-2 py-1 rounded-full">
            High Priority
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-outline uppercase tracking-wider mb-1">
            Open IT Issues
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            42
          </h3>
        </div>
      </div>

      {/* Active Agents */}
      <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-3 bg-surface-container-high rounded-lg">
            <img
              alt="icon"
              className="w-8 h-8 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAACmQBoxVCCIPg67uyZwxMM4Li0abAATmkOphEscXn6TF7o-uGdtjMXlFBJi6yvQIN4agC8Upyfwa0PRsH03SzvEfh-3m7k0ogsKZgsXtXWZm3DL0ToIKErxdCjELI5GrXaDVLV1h_YURn8Q5h7JLunFbY_0_adnEfHmD5JtAVuSE2DgCZVGrrIH3AcDzj2a7KDLOMPgISLUzCi2R9ef2P-3Joi2xUuHbwQd-pa8cdaGwhLIojUAL21Q91EVcK6_ErxesZyIIvQxk"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(30%) sepia(10%) saturate(1400%) hue-rotate(190deg) brightness(90%) contrast(85%)",
              }}
            />
          </div>
          <span className="text-on-surface-variant font-label-md bg-surface-container-high px-2 py-1 rounded-full">
            Active Now
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-outline uppercase tracking-wider mb-1">
            Active Agents
          </p>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            15
          </h3>
        </div>
      </div>
    </div>
  );
}
