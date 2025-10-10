// src/components/MobileMenu.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu({
  open = false,
  onClose,
  links = [],
  returnFocusRef,
}) {
  const panelRef = useRef(null);

  function getFocusable() {
    const node = panelRef.current;
    if (!node) return [];
    return Array.from(
      node.querySelectorAll(
        'button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])'
      )
    );
  }
  function focusFirst() {
    const [first] = getFocusable();
    first?.focus?.();
  }

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const returnTo = returnFocusRef?.current;

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      } else if (e.key === "Tab") {
        const items = getFocusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    setTimeout(focusFirst, 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus?.();
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const isRoute = (href) => href.startsWith("/") && !href.includes("#");

  return (
    <div className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* dim overlay */}
      <button
        type="button"
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        } z-[90] bg-black/40`}
        tabIndex={-1}
      />

      {/* centered wide panel (not full screen) */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "fixed top-[72px] left-3 right-3 mx-auto z-[100] isolate",
          "w-[92vw] max-w-[520px] rounded-2xl p-4 sm:p-5",
          "backdrop-blur bg-black/20 dark:bg-white/10 ring-1 ring-white/15",
          "transition-all duration-200",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5",
        ].join(" ")}
      >
        {/* close button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg
                       border border-white/20 bg-white/10 backdrop-blur
                       ring-1 ring-black/5 dark:ring-white/10
                       hover:border-[var(--accent)] transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                       cursor-pointer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <path
                fill="currentColor"
                d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29 10.59 10.6l6.3-6.31z"
              />
            </svg>
          </button>
        </div>

        {/* nav list (centered) */}
        <div className="mt-2 flex justify-center">
          <ul className="flex flex-col items-center gap-4 uppercase tracking-[0.2em] text-sm text-center">
            {links.map((l) => (
              <li key={l.href}>
                {isRoute(l.href) ? (
                  <Link
                    to={l.href}
                    onClick={onClose}
                    className="inline-block py-3 px-2 plop no-underline cursor-pointer select-none"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    onClick={onClose}
                    className="inline-block py-3 px-2 plop no-underline cursor-pointer select-none"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* divider + theme toggle row */}
        <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
