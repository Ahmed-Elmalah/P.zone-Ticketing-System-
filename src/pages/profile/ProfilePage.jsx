import React from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileDetailsForm from "../../components/profile/ProfileDetailsForm";
import ProfileSecurityForm from "../../components/profile/ProfileSecurityForm";

export default function ProfilePage() {
  return (
    // Main container designed to fit cleanly inside your existing layout Outlet
    <main className="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl">
      
      {/* 1. Hero / Banner Section */}
      <ProfileHero />

      {/* 2. Performance / Activity Stats */}
      <ProfileStats />

      {/* 3. Personal Information Edit Form */}
      <ProfileDetailsForm />

      {/* 4. Security & Password Update Form */}
      <ProfileSecurityForm />

    </main>
  );
}