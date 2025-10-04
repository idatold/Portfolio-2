import { useEffect, useState } from "react";

/* crisp, symmetric icons */
function SunIcon({ className = "", ...props }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className={className} {...props}>
      <circle cx="12" cy="12" r="4.25" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <line x1="12" y1="2.5"  x2="12" y2="5.0" />
        <line x1="12" y1="19.0" x2="12" y2="21.5" />
        <line x1="2.5" y1="12"  x2="5.0" y2="12" />
        <line x1="19.0" y1="12"  x2="21.5" y2="12" />
        <line x1="5.05" y1="5.05" x2="7.2" y2="7.2" />
        <line x1="16.8" y1="16.8" x2="18.95" y2="18.95" />
        <line x1="5.05" y1="18.95" x2="7.2" y2="16.8" />
        <line x1="16.8" y1="7.2"  x2="18.95" y2="5.05" />
      </g>
    </svg>
  );
}
function MoonIcon({ className = "", ...props }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className={className} {...props}>
      <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }) {
  const initial =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const [isDark, setIsDark] = useState(Boolean(initial));

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className={"flex items-center gap-3 text-[var(--text-link)] " + className}>
      {/* Sun button */}
      <button
        type="button"
        onClick={() => setIsDark(false)}
        aria-label="Switch to light mode"
        className={"transition-opacity duration-300 ease-out cursor-pointer " + (isDark ? "opacity-60" : "opacity-100")}
      >
        <SunIcon />
      </button>

      {/* Toggle pill */}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setIsDark((v) => !v)}
        className="relative inline-flex h-7 w-14 items-center rounded-full border border-current/40 bg-current/10
                   hover:bg-current/15 transition-colors duration-300 ease-out
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-current/40 cursor-pointer"
      >
        <span
          className={
            "pointer-events-none absolute left-0.5 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-current " +
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform " +
            "motion-reduce:transition-none " +
            (isDark ? "translate-x-7" : "translate-x-0")
          }
        />
      </button>

      {/* Moon button */}
      <button
        type="button"
        onClick={() => setIsDark(true)}
        aria-label="Switch to dark mode"
        className={"transition-opacity duration-300 ease-out cursor-pointer " + (isDark ? "opacity-100" : "opacity-60")}
      >
        <MoonIcon />
      </button>
    </div>
  );
}
