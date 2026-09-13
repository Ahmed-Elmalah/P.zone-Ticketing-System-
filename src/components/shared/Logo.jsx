import logoBlack from "../../assets/horizontal-logo-black.png";
import logoWhite from "../../assets/horizontal-logo-white.png";
import logoIcon from "../../assets/logo-icon.png";
import useThemeStore from "../../store/useThemeStore";

export default function Logo({ className = "", height = 36, variant = "full" }) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  if (variant === "icon") {
    return (
      <img
        src={logoIcon}
        alt="P.ZONE"
        style={{ height: `${height}px` }}
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <img
      src={isDark ? logoWhite : logoBlack}
      alt="P.ZONE"
      style={{ height: `${height}px` }}
      className={`object-contain transition-opacity duration-200 ${className}`}
    />
  );
}
