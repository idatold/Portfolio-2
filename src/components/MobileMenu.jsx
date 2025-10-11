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
  const isRoute = (href) => href.startsWith("/") && !href.includes("#");

  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const returnTo = returnFocusRef?.current;

    function getFocusable() {
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
  }, [open, onClose, returnFocusRef]);

  return (
    <div className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "fixed inset-0 z-[120] isolate flex flex-col transition-all duration-200",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5",
          "backdrop-blur-2xl backdrop-brightness-70",
          "bg-[color-mix(in_oklab,var(--grad-end)_66%,transparent)]",
          "dark:bg-[color-mix(in_oklab,var(--grad-mid)_66%,transparent)]",
          "ring-1 ring-black/10 dark:ring-white/10",
          "border-x border-white/40 dark:border-white/12",
          "will-change-transform",
        ].join(" ")}
      >
        {/* OPAQUE TOP CAP (prevents header bleed) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-14 sm:h-16
                     bg-[linear-gradient(to_bottom,oklab(from_var(--grad-end)_l_a_b/_1)_0%,oklab(from_var(--grad-end)_l_a_b/_1)_60%,transparent_100%)]
                     dark:bg-[linear-gradient(to_bottom,oklab(from_var(--grad-mid)_l_a_b/_1)_0%,oklab(from_var(--grad-mid)_l_a_b/_1)_60%,transparent_100%)]"
        />

        {/* TOP BAR: visually Theme left, ✕ right — DOM order keeps ✕ first for focus */}
        <div className="relative z-[1] flex items-center justify-between p-4">
          {/* ✕ first in DOM (focus-first), but visually ordered to the right */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={[
              "order-2 h-10 w-10 inline-flex items-center justify-center rounded-xl leading-none",
              "border border-white/40 dark:border-white/12",
              "bg-white/15 dark:bg-white/10",
              "hover:bg-white/25 dark:hover:bg-white/14",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
              // ensure exact centering of the glyph
              "[&>svg]:block",
            ].join(" ")}
          >
            {/* True centered “X”: two lines, centered in 24x24 viewBox */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <line x1="18" y1="6" x2="6" y2="18"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </button>

          <div className="order-1 flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] opacity-90 text-[var(--text-link)]">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* LINKS */}
        <div className="flex-1">
          <ul className="mx-auto max-w-[560px] px-4 pt-1 sm:pt-2 pb-6 flex flex-col items-center text-center gap-3 sm:gap-3.5">
            {links.map((l) => {
              const Item = isRoute(l.href) ? Link : "a";
              const itemProps = isRoute(l.href) ? { to: l.href } : { href: l.href };

              return (
                <li key={l.href} className="w-full">
                  <Item
                    {...itemProps}
                    onClick={onClose}
                    className={[
                      "relative block w-full rounded-2xl px-4 py-3.5",
                      "font-semibold uppercase tracking-[0.14em]",
                      "text-base sm:text-lg",
                      "no-underline cursor-pointer select-none",
                      "text-[var(--text-link)]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                      "transition-colors shadow-sm border",
                      "backdrop-blur-xl backdrop-brightness-75",
                      // Light
                      "bg-[color-mix(in_oklab,var(--accent)_36%,transparent)]",
                      "hover:bg-[color-mix(in_oklab,var(--accent)_42%,transparent)]",
                      // Dark
                      "dark:bg-white/22 dark:hover:bg-white/26",
                      "border-white/40 dark:border-white/15",
                      // soft inner glow
                      "before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none",
                      "before:shadow-[inset_0_0_18px_0_color-mix(in_oklab,var(--accent)_32%,transparent)]",
                      "dark:before:shadow-[inset_0_0_18px_0_rgba(255,255,255,0.14)]",
                    ].join(" ")}
                  >
                    {l.label}
                  </Item>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
