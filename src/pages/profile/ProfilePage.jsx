import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileDetailsForm from "../../components/profile/ProfileDetailsForm";
import ProfileSecurityForm from "../../components/profile/ProfileSecurityForm";
import { useAuthStore } from "../../auth/authStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const roleName = user?.role?.name?.toLowerCase();
  const roleType = user?.role?.type?.toLowerCase();
  const isHelp = roleName === "help" || roleName === "helpdesk" || roleType === "help" || roleType === "helpdesk";

  return (
    <main className="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl">
      
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

      {/* 1. Hero / Banner Section */}
      <ProfileHero />

      {/* 2. Performance / Activity Stats */}
      {isHelp && <ProfileStats />}

      {/* 3. Personal Information Edit Form */}
      <ProfileDetailsForm />

      {/* 4. Security & Password Update Form */}
      <ProfileSecurityForm />

    </main>
  );
}