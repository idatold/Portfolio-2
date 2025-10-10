// src/components/Header.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import logo from "../assets/Idalogo.jpg"; // ← ensure casing matches your file

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" }, // CHANGED
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);

  return (
    // not sticky
    <header className="relative z-[1] bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-5">
        {/* MOBILE BAR: absolute-centered logo, controls pinned left/right */}
        <div className="relative h-14 md:hidden">
          {/* Left: theme toggle */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <ThemeToggle />
          </div>

          {/* Center: logo (perfectly centered) */}
          <Link
            to="/"
            aria-label="Go to home"
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center glow-orb"
          >
            <img
              src={logo}
              alt="Ida Toldnæs logo"
              className="h-15 w-15 rounded-full object-cover select-none
                         ring-1 ring-white/30 dark:ring-white/20
                         shadow-[0_2px_10px_rgba(0,0,0,0.25)]
                         transition-transform duration-200
                         hover:scale-[1.03] active:scale-[0.98]"
              draggable="false"
            />
            <span className="sr-only">Home</span>
          </Link>

          {/* Right: hamburger */}
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              ref={burgerRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-current/30 cursor-pointer"
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </div>
            </button>
          </div>
        </div>

        {/* DESKTOP: logo left • nav center • actions(right) */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* LEFT: logo */}
          <Link
            to="/"
            aria-label="Go to home"
            className="justify-self-start inline-flex items-center glow-orb"
          >
            <img
              src={logo}
              alt="Ida Toldnæs logo"
              className="h-15 w-15 rounded-full object-cover select-none
                         ring-1 ring-white/30 dark:ring-white/20
                         shadow-[0_2px_10px_rgba(0,0,0,0.25)]
                         transition-transform duration-200
                         hover:scale-[1.03] active:scale-[0.98]"
              draggable="false"
            />
            <span className="sr-only">Home</span>
          </Link>

          {/* CENTER: nav */}
          <nav className="justify-self-center uppercase tracking-[0.2em] text-sm flex items-center gap-x-[6rem] lg:gap-x-[8rem] xl:gap-x-[10rem] 2xl:gap-x-[12rem]">
            {LINKS.map((l) =>
              l.href.startsWith("/") && !l.href.includes("#") ? (
                <Link
                  key={l.href}
                  to={l.href}
                  className="plop no-underline cursor-pointer select-none opacity-70 dark:opacity-80 hover:opacity-100 transition-opacity glow-link"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="plop no-underline cursor-pointer select-none opacity-70 dark:opacity-80 hover:opacity-100 transition-opacity glow-link"
                >
                  {l.label}
                </a>
              )
            )}
          </nav>

          {/* RIGHT: theme toggle */}
          <div className="justify-self-end flex items-center gap-4">
            <ThemeToggle />
          </div>
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
