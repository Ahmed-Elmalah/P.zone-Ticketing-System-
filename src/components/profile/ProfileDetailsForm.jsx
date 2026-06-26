import React, { useState } from "react";
import { 
  MdEdit, 
  MdPerson, 
  MdEmail, 
  MdPhone, 
  MdBusiness, 
  MdCheck, 
  MdClose 
} from "react-icons/md";

export default function ProfileDetailsForm() {
  // State to toggle between view and edit modes
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative">
      
      {/* ── Header & Action Buttons ── */}
      <div className="flex justify-between items-center mb-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Personal Information
        </h2>
        
        {/* Toggle Edit / Save State */}
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-primary text-on-primary font-button-text text-button-text py-2 px-md rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm flex items-center gap-2"
          >
            <MdEdit size={18} /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-sm">
            <button 
              onClick={() => setIsEditing(false)}
              className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error-container"
              title="Cancel"
            >
              <MdClose size={20} />
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-secondary text-on-secondary font-button-text text-button-text py-2 px-md rounded-lg hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-sm flex items-center gap-2"
            >
              <MdCheck size={18} /> Save Changes
            </button>
          </div>
        )}
      </div>

      {/* ── Form Inputs Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        
        {/* Full Name */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdPerson size={16} /> Full Name
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-70 disabled:bg-surface-container-lowest outline-none transition-colors" 
            disabled={!isEditing} 
            type="text" 
            defaultValue="Sarah Jenkins" 
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdEmail size={16} /> Email Address
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-70 disabled:bg-surface-container-lowest outline-none transition-colors" 
            disabled={!isEditing} 
            type="email" 
            defaultValue="sarah.j@omnisupport.com" 
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdPhone size={16} /> Phone Number
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-70 disabled:bg-surface-container-lowest outline-none transition-colors" 
            disabled={!isEditing} 
            type="tel" 
            defaultValue="+1 (555) 019-2834" 
          />
        </div>

        {/* Department */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdBusiness size={16} /> Department
          </label>
          <input 
            className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-70 disabled:bg-surface-container-lowest outline-none transition-colors" 
            disabled={!isEditing} 
            type="text" 
            defaultValue="Tier 3 Infrastructure Support" 
          />
        </div>

      </div>
    </section>
  );
}