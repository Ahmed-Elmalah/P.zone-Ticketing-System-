import Logo from "../../../components/shared/Logo";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      {/* Official P.ZONE Logo */}
      <Logo height={44} />

      {/* Centralized IT Support Badge */}
      <span className="text-[10px] px-3.5 py-0.5 rounded-full font-mono font-extrabold uppercase tracking-widest bg-indigo-50 text-indigo-700 border border-indigo-200/85 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-900/30 shadow-xs select-none">
        IT Support
      </span>
    </div>
  );
}
