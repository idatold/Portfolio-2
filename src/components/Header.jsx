import { useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#archive", label: "Archive" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* left spacer (no brand) */}
        <div />

        {/* DESKTOP NAV — extra spacing between links */}
<nav className="hidden md:flex justify-self-center items-center uppercase tracking-[0.2em] text-sm gap-x-[6rem] lg:gap-x-[8rem] xl:gap-x-[10rem] 2xl:gap-x-[12rem]">
  {LINKS.map((l) => (
    <a
      key={l.href}
      href={l.href}
      className="plop no-underline cursor-pointer select-none opacity-70 dark:opacity-80 hover:opacity-100 transition-opacity glow-link"
    >
      {l.label}
    </a>
  ))}
</nav>


        {/* RIGHT: theme toggle + hamburger (hamburger only on mobile) */}
        <div className="justify-self-end flex items-center gap-4">
          <ThemeToggle />
          <button
            ref={burgerRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-current/30 cursor-pointer"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        links={LINKS}
        returnFocusRef={burgerRef}
      />
    </header>
  );
}
