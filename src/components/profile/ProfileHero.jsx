import React from "react";
import { MdEdit, MdPerson } from "react-icons/md";
import { useAuthStore } from "../../auth/authStore";

export default function ProfileHero() {
  const { user } = useAuthStore();
  
  // Format role for display (e.g. 'help' -> 'Help Desk', 'authenticated' -> 'User')
  const getDisplayRole = (roleType) => {
    if (!roleType) return "User";
    if (roleType === "help" || roleType === "helpdesk") return "Help Desk Agent";
    if (roleType === "admin") return "Administrator";
    return "User";
  };

  return (
    <section className="flex flex-col items-center text-center bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative overflow-hidden">
      
      {/* Background Banner Gradient */}
      <div className="absolute inset-0 h-32 bg-linear-to-r from-primary/10 to-secondary-fixed/20"></div>
      
      <div className="relative z-10 flex flex-col items-center mt-12">
        {/* User Avatar with Edit Overlay */}
        <div className="relative cursor-pointer mb-md">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-md bg-surface-container-high flex items-center justify-center">
            {user?.avatar?.url ? (
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover" 
                src={`http://localhost:1337${user.avatar.url}`} 
              />
            ) : (
              <MdPerson className="text-6xl text-outline" />
            )}
          </div>
          
          {/* Permanent Edit Icon (Visible on Mobile & Desktop) */}
          <div className="absolute bottom-2 right-2 bg-primary text-on-primary p-2 rounded-full shadow-md hover:bg-on-primary-fixed-variant transition-colors border-2 border-surface-container-lowest">
            <MdEdit className="text-lg" />
          </div>
        </div>
        
        {/* User Info */}
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
          {user?.username || "Unknown User"}
        </h1>
        
        {/* Role Badge */}
        <div className="bg-secondary-container text-on-secondary-container font-label-md text-label-md px-3 py-1 rounded-full inline-block">
          {getDisplayRole(user?.role?.type)}
        </div>
        
        {/* Bio / Description */}
        <p className="mt-md font-body-md text-body-md text-on-surface-variant max-w-2xl">
          {user?.email || "No email provided."}
        </p>
      </div>

    </section>
  );
}