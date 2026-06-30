import React, { useState } from "react";
import { MdLock, MdLockReset, MdVerifiedUser } from "react-icons/md";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axiosConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ProfileSecurityForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    // 2. API Request
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/change-password", {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      });

      // 3. On Success
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      // 4. On Error
      const errorMsg = error.response?.data?.error?.message || "Failed to change password. Please check your current password.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative">
      
      {/* Header */}
      <div className="mb-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface">Security & Password</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Manage your password and account security.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
          
          {/* Current Password */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
              <MdLock size={16} /> Current Password
            </label>
            <input 
              className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              type="password" 
              placeholder="••••••••" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          {/* New Password */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
              <MdLockReset size={16} /> New Password
            </label>
            <input 
              className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              type="password" 
              placeholder="••••••••" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          {/* Confirm Password (Takes full width on small, half on medium screens) */}
          <div className="flex flex-col gap-xs md:col-span-2">
            <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
              <MdVerifiedUser size={16} /> Confirm New Password
            </label>
            <input 
              className="bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

        </div>
        
        {/* Form Submit Action */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary text-on-primary font-button-text text-button-text py-2 px-md rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>

    </section>
  );
}