import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileDetailsForm from "../../components/profile/ProfileDetailsForm";
import ProfileSecurityForm from "../../components/profile/ProfileSecurityForm";
import ProfileStats from "../../components/profile/ProfileStats";
import { useAuthStore } from "../../auth/authStore";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Check if the user is a helpdesk agent
  const roleName = user?.role?.name?.toLowerCase();
  const roleType = user?.role?.type?.toLowerCase();
  const isHelpDesk = roleName === "help" || roleName === "helpdesk" || roleType === "help" || roleType === "helpdesk";

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl">
        
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-button-text text-button-text"
          >
            <MdArrowBack size={20} />
            Back
          </button>
        </div>

        {/* Hero Section */}
        <ProfileHero />

        {/* Stats Section — Only visible for Help Desk agents */}
        {isHelpDesk && <ProfileStats />}

        <div className="grid grid-cols-1 gap-xl">
          {/* Read-only Personal Information */}
          <ProfileDetailsForm />
          
          {/* Security (Password Change) */}
          <ProfileSecurityForm />
        </div>
        
      </main>
    </div>
  );
}
