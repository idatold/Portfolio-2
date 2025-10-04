import { useEffect, useRef } from "react";

/**
 * MobileMenu
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - links: Array<{ href: string; label: string }>
 * - returnFocusRef?: React.RefObject<HTMLElement>  // the hamburger button
 */
export default function MobileMenu({
  open = false,
  onClose,
  links = [],
  returnFocusRef,
}) {
  const panelRef = useRef(null);

  // Focus helpers
  function getFocusable() {
    const node = panelRef.current;
    if (!node) return [];
    return Array.from(
      node.querySelectorAll(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
      )
    );
  }
  function focusFirst() {
    const [first] = getFocusable();
    first?.focus?.();
  }

  // Esc to close, focus trap, body scroll lock, and return focus
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
    // Focus after paint
    setTimeout(focusFirst, 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // return focus to the hamburger
      if (returnFocusRef?.current) {
        returnFocusRef.current.focus?.();
      }
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* overlay (click to close) */}
      <button
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={-1}
      />

      {/* floating panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "absolute right-4 top-[calc(100%+8px)] min-w-[220px] rounded-2xl p-4",
          "backdrop-blur bg-black/20 dark:bg-white/10 ring-1 ring-white/15",
          "transition-all duration-200",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5",
        ].join(" ")}
      >
        <ul className="flex flex-col gap-3 uppercase tracking-[0.2em] text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={onClose}
                className="block py-2 px-2 plop no-underline cursor-pointer select-none"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
