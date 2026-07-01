import React, { useState } from "react";
import { MdPerson, MdEmail, MdComputer, MdPhone, MdEdit, MdSave, MdClose, MdBadge } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuthStore } from "../../auth/authStore";
import { userRepo } from "../../api/userRepo";
import toast from "react-hot-toast";

export default function ProfileDetailsForm() {
  const { user, setUser } = useAuthStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    employeeId: user?.employeeId || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    deviceNumber: user?.deviceNumber || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      employeeId: user?.employeeId || "",
      username: user?.username || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      deviceNumber: user?.deviceNumber || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!formData.username || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      setIsLoading(true);
      // userRepo.updateUser calls PUT /users/:id
      const updatedUser = await userRepo.updateUser(user.id, formData);
      
      // Update the global auth store
      const newUserData = { ...user, ...updatedUser };
      
      // Update storage
      if (sessionStorage.getItem("user-info")) {
        sessionStorage.setItem("user-info", JSON.stringify(newUserData));
      } else if (localStorage.getItem("user-info")) {
        localStorage.setItem("user-info", JSON.stringify(newUserData));
      }

      setUser(newUserData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error(error?.response?.data?.error?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative">
      
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-lg">
        <div className="flex items-center gap-3">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Personal Information
          </h2>
          {!isEditing && (
            <span className="font-label-md text-label-md text-on-surface-variant italic">
              (Read Only)
            </span>
          )}
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-button-text text-button-text"
          >
            <MdEdit size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors font-button-text text-button-text disabled:opacity-50"
            >
              <MdClose size={18} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-1 bg-primary text-on-primary px-3 py-1.5 rounded-md hover:bg-primary-container transition-colors font-button-text text-button-text disabled:opacity-50"
            >
              {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" size={16} /> : <MdSave size={18} />}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* ── Form Inputs Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        
        {/* Employee ID */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdBadge size={16} /> Employee Number
          </label>
          <input 
            name="employeeId"
            className={`border rounded-lg p-3 font-body-md text-body-md outline-none transition-colors ${
              isEditing 
                ? "bg-surface border-outline focus:border-primary text-on-surface" 
                : "bg-surface-container-low border-outline-variant text-on-surface-variant cursor-not-allowed"
            }`}
            readOnly={!isEditing} 
            type="text" 
            value={formData.employeeId} 
            onChange={handleInputChange}
          />
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdPerson size={16} /> Username
          </label>
          <input 
            name="username"
            className={`border rounded-lg p-3 font-body-md text-body-md outline-none transition-colors ${
              isEditing 
                ? "bg-surface border-outline focus:border-primary text-on-surface" 
                : "bg-surface-container-low border-outline-variant text-on-surface-variant cursor-not-allowed"
            }`}
            readOnly={!isEditing} 
            type="text" 
            value={formData.username} 
            onChange={handleInputChange}
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdEmail size={16} /> Email Address
          </label>
          <input 
            name="email"
            className={`border rounded-lg p-3 font-body-md text-body-md outline-none transition-colors ${
              isEditing 
                ? "bg-surface border-outline focus:border-primary text-on-surface" 
                : "bg-surface-container-low border-outline-variant text-on-surface-variant cursor-not-allowed"
            }`}
            readOnly={!isEditing} 
            type="email" 
            value={formData.email} 
            onChange={handleInputChange}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdPhone size={16} /> Phone Number
          </label>
          <input 
            name="phoneNumber"
            className={`border rounded-lg p-3 font-body-md text-body-md outline-none transition-colors ${
              isEditing 
                ? "bg-surface border-outline focus:border-primary text-on-surface" 
                : "bg-surface-container-low border-outline-variant text-on-surface-variant cursor-not-allowed"
            }`}
            readOnly={!isEditing} 
            type="tel" 
            value={formData.phoneNumber} 
            onChange={handleInputChange}
          />
        </div>

        {/* Device Number */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-xs">
            <MdComputer size={16} /> Device Number
          </label>
          <input 
            name="deviceNumber"
            className={`border rounded-lg p-3 font-body-md text-body-md outline-none transition-colors ${
              isEditing 
                ? "bg-surface border-outline focus:border-primary text-on-surface" 
                : "bg-surface-container-low border-outline-variant text-on-surface-variant cursor-not-allowed"
            }`}
            readOnly={!isEditing} 
            type="text" 
            value={formData.deviceNumber} 
            onChange={handleInputChange}
          />
        </div>

      </div>
    </section>
  );
}