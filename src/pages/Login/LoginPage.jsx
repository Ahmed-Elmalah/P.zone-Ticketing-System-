import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import LoginFooter from "./components/LoginFooter";

export default function LoginPage() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop antialiased relative overflow-hidden">

      {/* ── Animated Floating Blurred Background Orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        {/* Top-left Indigo/Blue Orb */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-indigo-500/30 via-indigo-400/20 to-blue-400/15 dark:from-indigo-600/25 dark:to-blue-500/15 blur-[110px] animate-float-1" />

        {/* Bottom-right Teal/Cyan Orb */}
        <div className="absolute -bottom-32 -right-32 w-[540px] h-[540px] rounded-full bg-gradient-to-br from-teal-400/25 via-emerald-400/20 to-cyan-400/15 dark:from-teal-500/20 dark:to-emerald-500/15 blur-[120px] animate-float-2" />

        {/* Floating Center-Right Purple/Violet Orb */}
        <div className="absolute top-1/3 -right-16 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/15 dark:from-purple-600/18 dark:to-pink-600/12 blur-[100px] animate-float-3" />

        {/* Floating Bottom-Left Amber/Indigo Orb */}
        <div
          className="absolute bottom-1/4 -left-16 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-amber-400/15 via-purple-400/15 to-indigo-400/10 dark:from-amber-500/10 dark:to-indigo-500/10 blur-[110px] animate-float-1"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      {/* ── Login Card (Clean, centered frosted glass) ── */}
      <div className="w-full max-w-120 bg-surface-container-lowest/80 dark:bg-surface-container-low/85 backdrop-blur-2xl rounded-3xl p-lg md:p-xl flex flex-col gap-lg border border-white/60 dark:border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] relative z-10">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>

    </div>
  );
}