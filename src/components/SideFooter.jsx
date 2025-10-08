export default function SideFooter({
  github = "https://github.com/idatold",       // ← swap to your profile
  linkedin = "https://www.linkedin.com/in/ida-charlotte-loriann-toldn%C3%A6s-920190117/", // ← swap to your profile
  year = 2025,
}) {
  return (
    <>
      {/* Desktop/tablet: vertical rail on the left */}
      <div className="hidden md:flex fixed inset-y-0 left-6 md:left-8 lg:left-10 xl:left-12 z-40 flex-col items-center justify-between py-10 bg-transparent">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (opens in new tab)"
          className="plop no-underline cursor-pointer select-none opacity-80 hover:opacity-100
                     [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180
                     tracking-[0.35em] text-xs uppercase"
        >
          GitHub
        </a>

        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (opens in new tab)"
          className="plop no-underline cursor-pointer select-none opacity-80 hover:opacity-100
                     [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180
                     tracking-[0.35em] text-xs uppercase"
        >
          LinkedIn
        </a>

        <span
          aria-label={`Copyright ${year}`}
          className="select-none opacity-70
                     [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180
                     tracking-[0.35em] text-xs uppercase"
        >
          © {year}
        </span>
      </div>

      {/* Mobile: simple bottom bar */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 sm:gap-6 bg-transparent">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="plop no-underline cursor-pointer select-none uppercase text-xs tracking-[0.1em] sm:tracking-[0.2em]"
        >
          GitHub
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="plop no-underline cursor-pointer select-none uppercase text-xs tracking-[0.1em] sm:tracking-[0.2em]"
        >
          LinkedIn
        </a>
        <span className="select-none uppercase text-xs tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap leading-none">
          © {year}
        </span>
      </div>
    </>
  );
}
