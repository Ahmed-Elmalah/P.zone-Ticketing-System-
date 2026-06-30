import React from "react";
import { useAuthStore } from "../../../auth/authStore";

export default function DashboardHeader() {
  const { user } = useAuthStore();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
      <div>
        <h1 className="font-display-sm text-display-sm md:font-display-md md:text-display-md text-on-surface font-bold">
          Welcome back, {user?.username}!
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
          Here is your queue overview for {currentDate}.
        </p>
      </div>
    </div>
  );
}