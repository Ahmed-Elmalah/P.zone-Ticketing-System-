import React from "react";
import { MdPerson, MdEmail, MdComputer, MdPhone } from "react-icons/md";
import { useAuthStore } from "../../auth/authStore";

export default function ProfileDetailsForm() {
  const { user } = useAuthStore();

  return (
    <section className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative">
      
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Personal Information
        </h2>
        <span className="font-label-md text-label-md text-on-surface-variant italic">
          (Read Only)
        </span>
      </div>

      {/* ── Form Inputs Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        
        {/* Full Name */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdPerson size={16} /> Username
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface-variant cursor-not-allowed outline-none" 
            readOnly 
            type="text" 
            value={user?.username || "—"} 
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdEmail size={16} /> Email Address
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface-variant cursor-not-allowed outline-none" 
            readOnly 
            type="email" 
            value={user?.email || "—"} 
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdPhone size={16} /> Phone Number
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface-variant cursor-not-allowed outline-none" 
            readOnly 
            type="tel" 
            value={user?.phoneNumber || "—"} 
          />
        </div>

        {/* Device Number */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdComputer size={16} /> Device Number
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface-variant cursor-not-allowed outline-none" 
            readOnly 
            type="text" 
            value={user?.deviceNumber || "—"} 
          />
        </div>

      </div>
    </section>
  );
}