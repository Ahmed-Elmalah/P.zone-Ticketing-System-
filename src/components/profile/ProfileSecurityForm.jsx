import React from "react";
import { MdLock, MdLockReset, MdVerifiedUser } from "react-icons/md";

export default function ProfileSecurityForm() {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative">
      
      {/* Header */}
      <div className="mb-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface">Security & Password</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Manage your password and account security.</p>
      </div>
      
      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
        
        {/* Current Password */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdLock size={16} /> Current Password
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
            type="password" 
            placeholder="••••••••" 
          />
        </div>
        
        {/* New Password */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdLockReset size={16} /> New Password
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
            type="password" 
            placeholder="••••••••" 
          />
        </div>
        
        {/* Confirm Password (Takes full width on small, half on medium screens) */}
        <div className="flex flex-col gap-xs md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdVerifiedUser size={16} /> Confirm New Password
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
            type="password" 
            placeholder="••••••••" 
          />
        </div>

      </div>
      
      {/* Form Submit Action */}
      <div className="flex justify-end">
        <button className="bg-primary text-on-primary font-button-text text-button-text py-2 px-md rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm flex items-center gap-2">
          Change Password
        </button>
      </div>

    </section>
  );
}