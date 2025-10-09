import idaAbout from "../assets/ida-about.jpg"; // <- replace with your actual filename
// If you keep the same "polaroid" look as Home, this will feel like a sibling screen.

export default function About() {
  return (
    <section
      className="relative z-10 mx-auto max-w-[1100px]
        px-2 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 mt-22
        overflow-visible"
    >
      <div
        className="
          grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 lg:gap-8 items-stretch isolate
          rounded-lg sm:rounded-2xl p-3 sm:p-6 lg:p-8
          ring-1 ring-black/10 dark:ring-white/20
          bg-white/25 dark:bg-white/5
          backdrop-blur-xl
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
          border border-white/30 dark:border-white/10
          overflow-visible
        "
      >
        {/* Left: polaroid (desktop) */}
        <div className="order-2 lg:order-1 lg:h-full hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-[320px] bg-white/30 dark:bg-white/5 rounded-sm shadow-md ring-1 ring-black/10 dark:ring-white/10 rotate-[-1.5deg] px-4 pt-4 pb-10 backdrop-blur-md border border-white/20 dark:border-white/10">
            <img
              src={idaAbout}
              alt="Portrait of Ida Toldnæs"
              className="block w-full aspect-[4/5] object-cover [filter:grayscale(100%)]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Right: text stack + mobile image */}
        <div className="order-1 lg:order-2 lg:h-full flex">
          <div
            className="
              flex flex-col justify-center gap-6 sm:gap-7
              w-full max-w-prose
              items-center lg:items-start
              text-center lg:text-left
              mx-auto lg:mx-0
            "
          >
            {/* Mobile polaroid */}
            <div className="lg:hidden w-full overflow-visible">
              <div className="relative w-full max-w-[320px] mx-auto bg-white/30 dark:bg-white/5 rounded-sm shadow-md ring-1 ring-black/10 dark:ring-white/10 rotate-[-1.5deg] px-4 pt-4 pb-10 backdrop-blur-md border border-white/20 dark:border-white/10">
                <img
                  src={idaAbout}
                  alt="Portrait of Ida Toldnæs"
                  className="block w-full aspect-[4/5] object-cover [filter:grayscale(100%)]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl">Who am I?</h1>

            <p className="leading-relaxed">
              Hi, I’m <strong>Ida Toldnæs</strong>, a front-end developer with a
              creative background in photography and a passion for building
              thoughtful, user-friendly digital experiences. For several years,
              I worked both at sea on a ferry and as a wedding and event
              photographer. Both jobs taught me patience, adaptability, and an
              eye for detail. That same perspective now shapes how I approach
              design and development, blending creativity with structure.
            </p>

            <p className="leading-relaxed">
              I call <strong>Larvik</strong> home, where I live with my boyfriend
              and our Maine Coon cat, <strong>Kali</strong>, who often supervises
              my coding sessions. I love music, everything from folk metal to
              pop, and spending time outdoors — especially in autumn, my favorite
              season. I have a mild caffeine addiction, an endless love for hot
              beverages, and an intense dislike for wet socks. Whether I’m writing
              code, taking photos, or creating something new, my goal is always to
              build experiences that feel intuitive, meaningful, and made with care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
