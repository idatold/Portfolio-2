import { useEffect, useMemo, useState } from "react";
import TypewriterHeading from "../components/TypewriterHeading";
import idaMain from "../assets/idamain.jpg";
import ProjectsCarousel from "../components/ProjectsCarousel";
import projects from "../data/projects";

export default function Home() {
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [startH1, setStartH1] = useState(false);
  const [h1Done, setH1Done] = useState(false);

  // Paragraph visibility gate (controls when H2 is allowed to start)
  const [paragraphVisible, setParagraphVisible] = useState(false);

  // H2 typing control
  const [startH2, setStartH2] = useState(false);

  // Kick off H1
  useEffect(() => {
    if (reduceMotion) {
      setStartH1(true);
      setH1Done(true);
      setParagraphVisible(true);
      return;
    }
    const t = setTimeout(() => setStartH1(true), 360);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  // When H1 finishes, decide when the paragraph is "arrived"
  useEffect(() => {
    if (!h1Done) return;
    if (reduceMotion) {
      setParagraphVisible(true);
      return;
    }

    // Desktop (lg+): wait for the CSS fade (700ms). Mobile: immediate.
    const isLg =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;

    if (isLg) {
      const t = setTimeout(() => setParagraphVisible(true), 700);
      return () => clearTimeout(t);
    } else {
      setParagraphVisible(true);
    }
  }, [h1Done, reduceMotion]);

  // Start H2 only when paragraph has arrived
  useEffect(() => {
    if (paragraphVisible) setStartH2(true);
  }, [paragraphVisible]);

  return (
    <>
      {/* Hero */}
      <section
        className="relative z-10 mx-auto max-w-[1100px]
          px-2 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10
          mt-12 sm:mt-16 lg:mt-22
          overflow-visible"
      >
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 lg:gap-8 items-stretch isolate
            rounded-lg sm:rounded-2xl p-3 sm:p-6 lg:p-8
            ring-1 ring-black/10 dark:ring-white/20
            glass-card backdrop-blur-xl
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
            border border-white/30 dark:border-white/10
            transition-all duration-700
            overflow-visible
          "
        >
          {/* Left: polaroid — desktop only */}
          <div className="order-2 lg:order-1 lg:h-full hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[320px] bg-white/30 dark:bg-white/5 rounded-sm shadow-md ring-1 ring-black/10 dark:ring-white/10 rotate-[-1.5deg] px-4 pt-4 pb-10 backdrop-blur-md border border-white/20 dark:border-white/10">
              <img
                src={idaMain}
                alt="Ida smiling on a boardwalk"
                className="block w-full aspect-[4/5] object-cover [filter:grayscale(100%)]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right: text stack (and mobile image inline) */}
          <div className="order-1 lg:order-2 lg:h-full flex">
            <div
              className="
                flex flex-col justify-center gap-6 sm:gap-8
                w-full max-w-prose
                items-center lg:items-start
                text-center lg:text-left
                mx-auto lg:mx-0
              "
            >
              {/* H1 */}
              <TypewriterHeading
                as="h1"
                text="Hi, I’m Ida!"
                start={startH1}
                startDelayMs={360}
                charDelayMs={100}
                endBlinkMs={0}
                className="text-4xl sm:text-5xl"
                onDone={() => setH1Done(true)}
              />

              {/* Mobile-only polaroid between H1 and paragraph */}
              <div className="lg:hidden w-full overflow-visible">
                <div className="relative w-full max-w-[320px] mx-auto bg-white/30 dark:bg-white/5 rounded-sm shadow-md ring-1 ring-black/10 dark:ring-white/10 rotate-[-1.5deg] px-4 pt-4 pb-10 backdrop-blur-md border border-white/20 dark:border-white/10">
                  <img
                    src={idaMain}
                    alt="Ida on a rooftop"
                    className="block w-full aspect-[4/5] object-cover [filter:grayscale(100%)]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Paragraph — static on mobile; fades only on lg+ */}
              <p
                className={[
                  "max-w-prose mx-auto lg:mx-0",
                  "opacity-100",
                  "lg:transition-opacity lg:duration-700",
                  h1Done ? "lg:opacity-100" : "lg:opacity-0",
                  "motion-reduce:lg:transition-none",
                ].join(" ")}
              >
                As a frontend developer, I combine a love for problem-solving
                with an eye for design. I believe websites should be functional,
                but also spark a bit of joy when people use them.
              </p>

              {/* H2 */}
              <TypewriterHeading
                as="h2"
                text="Nice To Meet Ya!"
                start={startH2}
                startDelayMs={80}
                charDelayMs={105}
                endBlinkMs={1600}
                className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects carousel */}
      <ProjectsCarousel projects={projects} />
    </>
  );
}
