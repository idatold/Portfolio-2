import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectsCarousel({ projects = [] }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const id = "projects-carousel";

  function updateArrows() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    const EPS = 2;
    setAtStart(x <= EPS);
    setAtEnd(x >= max - EPS);
  }

  function scrollByCards(dir = 1) {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector("[data-card]");
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;
    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width
      : el.clientWidth;

    const max = el.scrollWidth - el.clientWidth;
    const target = Math.min(
      Math.max(el.scrollLeft + dir * (cardWidth + gap), 0),
      max
    );
    el.scrollTo({ left: target, behavior: "smooth" });
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      className="relative z-[1] mx-auto max-w-[1100px]
        px-2 sm:px-6 lg:px-8
        mt-10 sm:mt-12 lg:mt-14
        pb-10 sm:pb-12 lg:pb-16
        mb-8 sm:mb-10 lg:mb-12
        overflow-x-hidden"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <h2 className="text-center text-2xl sm:text-3xl mb-4 sm:mb-6">Projects</h2>

      {/* Rounded container */}
      <div className="relative isolate rounded-2xl sm:rounded-3xl overflow-hidden bg-transparent">
        {/* Symmetric edge fades (visual only) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent dark:from-black/25"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/10 to-transparent dark:from-black/25"
        />

        <ul
          id={id}
          ref={trackRef}
          className="
            flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
            pt-3 pb-2
            px-6
            bg-transparent
            [-ms-overflow-style:none] [scrollbar-width:none]
            [scroll-snap-stop:always]
          "
          style={{
            scrollbarWidth: "none",
            scrollPaddingInline: "24px", // matches px-6 for clean edges
          }}
        >
          <style>{`#${id}::-webkit-scrollbar{display:none}`}</style>

          {projects.map((p) => {
            const tech =
              Array.isArray(p.tech) && p.tech.length
                ? p.tech
                : typeof p.stack === "string"
                ? p.stack.split(",").map((s) => s.trim()).filter(Boolean)
                : [];

            // Internal route target (slug preferred; fallback to id)
            const to = p.to ?? (p.slug ? `/projects/${p.slug}` : `/projects/${p.id}`);

            return (
              <li
                key={p.id}
                data-card
                className="
                  group relative snap-start flex-none
                  w-full
                  md:w-[calc((100%-24px)/2)]
                  lg:w-[calc((100%-48px)/3)]
                "
              >
                <article
                  className="
                    relative h-full flex flex-col
                    rounded-xl sm:rounded-2xl p-3 sm:p-5
                    bg-white/25 dark:bg-white/5
                    backdrop-blur-xl
                    border border-white/30 dark:border-white/10
                    ring-0
                    group-hover:ring-2 group-hover:ring-[var(--accent)]
                    focus-within:ring-2 focus-within:ring-[var(--accent)]
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_8px_32px_rgba(0,0,0,0.2)]
                    transition-all duration-300
                    cursor-pointer
                  "
                >
                  {/* Full-card overlay Link so the WHOLE card is clickable */}
                  <Link
                    to={to}
                    aria-label={`Open project: ${p.title}`}
                    className="
                      peer absolute inset-0 z-10
                      rounded-xl sm:rounded-2xl
                      focus-visible:outline-none
                    "
                  >
                    <span className="sr-only">Open project</span>
                  </Link>

                  {/* Image */}
                  <div className="relative rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                    <img
                      src={p.imgSrc}
                      alt={p.imgAlt}
                      className="
                        block w-full aspect-[16/10] object-cover
                        filter grayscale
                        transition duration-300
                        group-hover:grayscale-0
                        peer-focus:grayscale-0
                      "
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex-1 grid grid-rows-[auto_auto_1fr_auto] gap-y-1">
                    <div className="min-h-[1.8rem] flex flex-wrap gap-1.5">
                      {tech.map((tag) => (
                        <span
                          key={tag}
                          className="
                            inline-flex items-center
                            px-2 py-0.5 rounded-md
                            text-[10px] font-medium uppercase tracking-[0.12em]
                            bg-white/10 ring-1 ring-white/25 dark:ring-white/10
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium min-h-[2.2rem] flex items-end">
                      {p.title}
                    </h3>

                    <div className="mt-1 text-sm opacity-90 space-y-1">
                      <p>{p.line1}</p>
                      <p>{p.line2}</p>
                    </div>

                    {/* Visual pill only; real navigation is the overlay Link */}
                    <div className="mt-4 self-end">
                      <span
                        aria-hidden="true"
                        tabIndex={-1}
                        className="
                          block w-max mx-auto
                          rounded-full px-5 py-2
                          ring-0 group-hover:ring-2 group-hover:ring-[var(--accent)]
                          bg-white/10 group-hover:bg-white/20
                          transition glow-link no-underline text-sm cursor-pointer
                        "
                      >
                        Read more
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-controls={id}
          aria-label="Previous"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          className="
            rounded-full px-4 py-2
            ring-0 hover:ring-2 hover:ring-[var(--accent)]
            focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none
            bg-white/10 hover:bg-white/20
            cursor-pointer transition
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          Prev
        </button>
        <button
          type="button"
          aria-controls={id}
          aria-label="Next"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          className="
            rounded-full px-4 py-2
            ring-0 hover:ring-2 hover:ring-[var(--accent)]
            focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none
            bg-white/10 hover:bg-white/20
            cursor-pointer transition
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </section>
  );
}
