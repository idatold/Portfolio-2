import { useEffect, useMemo, useState } from "react";
import TypewriterHeading from "../components/TypewriterHeading";
import idaMain from "../assets/idamain.jpg";

export default function Home() {
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [startH1, setStartH1] = useState(false);
  const [h1Done, setH1Done] = useState(false);
  const [startH2, setStartH2] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setStartH1(true);
      setH1Done(true);
      setStartH2(true);
      return;
    }
    const t = setTimeout(() => setStartH1(true), 700);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (!h1Done || reduceMotion) return;
    const t = setTimeout(() => setStartH2(true), 700);
    return () => clearTimeout(t);
  }, [h1Done, reduceMotion]);

  return (
    <section className="mx-auto max-w-[1100px] px-8 py-10">
      {/* items-stretch ensures both columns share height on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch rounded-2xl p-6 lg:p-8 ring-1 ring-white/15 backdrop-blur-sm">
        {/* Left: polaroid — desktop only */}
        <div className="order-2 lg:order-1 lg:h-full hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-[320px] bg-white/90 dark:bg-white/10 rounded-sm shadow-md ring-1 ring-black/10 dark:ring-white/10 rotate-[-1.5deg] px-4 pt-4 pb-10">
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
          <div className="flex flex-col justify-center gap-6 sm:gap-8 w-full max-w-prose">
            {/* H1 */}
            <div>
              {/* Mobile: static H1 at the very top */}
              <h1
                className="text-4xl sm:text-5xl lg:hidden"
                style={{ fontFamily: '"Permanent Marker", system-ui, sans-serif' }}
              >
                Hi, I’m Ida!
              </h1>

              {/* Desktop: typewriter H1 */}
              <div className="hidden lg:block">
                <TypewriterHeading
                  as="h1"
                  text="Hi, I’m Ida!"
                  start={startH1}
                  startDelayMs={450}
                  charDelayMs={95}
                  className="text-5xl xl:text-6xl"
                  onDone={() => setH1Done(true)}
                />
              </div>
            </div>

            {/* Mobile-only polaroid between H1 and paragraph */}
            <div className="lg:hidden">
              <div className="relative w-full max-w-[320px] bg-white/90 dark:bg-white/10 rounded-sm shadow-md ring-1 ring-black/10 dark:ring-white/10 rotate-[-1.5deg] px-4 pt-4 pb-10">
                <img
                  src={idaMain}
                  alt="Ida smiling on a boardwalk"
                  className="block w-full aspect-[4/5] object-cover [filter:grayscale(100%)]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Paragraph — ALWAYS visible on mobile; fades only on lg+ */}
            <p
              className={[
                "max-w-prose",
                "opacity-100", // mobile: no fade
                "lg:transition-opacity lg:duration-700", // fade only on lg+
                h1Done ? "lg:opacity-100" : "lg:opacity-0",
                "motion-reduce:lg:transition-none", // respect reduced motion on lg+
              ].join(" ")}
            >
              As a frontend developer, I combine a love for problem-solving with an
              eye for design. I believe websites should be functional, but also
              spark a bit of joy when people use them.
            </p>

            {/* H2 */}
            <div>
              {/* Mobile: static H2 after paragraph */}
              <h2
                className="text-3xl sm:text-4xl lg:hidden"
                style={{ fontFamily: '"Permanent Marker", system-ui, sans-serif' }}
              >
                Nice To Meet Ya!
              </h2>

              {/* Desktop: typewriter H2 */}
              <div className="hidden lg:block">
                <TypewriterHeading
                  as="h2"
                  text="Nice To Meet Ya!"
                  start={startH2}
                  startDelayMs={0}
                  charDelayMs={75}
                  className="text-4xl xl:text-5xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
