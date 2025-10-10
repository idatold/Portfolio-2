export default function SideFooter({
  github = "https://github.com/idatold",
  linkedin = "https://www.linkedin.com/in/ida-charlotte-loriann-toldn%C3%A6s-920190117/",
  year = 2025,
}) {
  return (
    <>
      {/* Desktop/tablet: vertical rail on the left (sticky/fixed) */}
      <div
        className="hidden md:flex fixed inset-y-0 left-6 md:left-8 lg:left-10 xl:left-12 z-40
                   flex-col items-center justify-between py-10 bg-transparent"
        role="contentinfo"
        aria-label="Site footer"
      >
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

      {/* Mobile: simple bar that scrolls with content (NOT fixed) */}
      <footer
        className="md:hidden relative z-10 mt-8 mb-6 flex items-center justify-center gap-3 sm:gap-6
                   bg-transparent"
        role="contentinfo"
        aria-label="Site footer"
      >
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
      </footer>
    </>
  );
}
