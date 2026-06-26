// ============================================================
// WelcomeHeader.jsx
// Greeting section at the top of the dashboard.
// Shows the user's name from the auth store.
// ============================================================

import { useAuthStore } from "../../../auth/authStore";

export default function WelcomeHeader() {
  const { user } = useAuthStore();

  // Use username from store, fallback to "there"
  const name = user?.username || "there";

  return (
    <header>
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
        Welcome back, {name}!
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">
        Here is the status of your current requests.
      </p>
    </header>
  );
}
