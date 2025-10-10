import idaAbout from "../assets/ida-about.jpg"; // replace with your actual filename if different
import Breadcrumbs from "../components/Breadcrumbs.jsx";

// icons (brands from Simple Icons) + generic icons
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGithub,
  SiNetlify,
  SiVite,
  // SiVisualstudiocode, // ❌ not available in your react-icons build
  SiPostman,
  SiCanva,
  SiNextdotjs,
  SiFigma,
  SiVercel,
  SiNpm,
  SiAdobephotoshop,
  // SiAdobelightroom, // ⚠️ removed to avoid import error
} from "react-icons/si";
import {
  FiSmartphone,
  FiTool,
  FiUsers,
  FiLayers,
  FiActivity,
  FiInfo,
  FiRefreshCw,
  FiClipboard,
  FiTrendingUp,
  FiCode, // ✅ use this for "Visual Studio Code"
} from "react-icons/fi";

// Small chip renderer for skills/tools
function SkillChip({ Icon, label }) {
  return (
    <li
      className="px-3 py-2 rounded-xl bg-white/10 border border-white/20
                 backdrop-blur hover:bg-white/20 transition
                 flex items-center justify-center gap-2 text-center"
    >
      {Icon && <Icon className="text-base shrink-0" aria-hidden="true" />}
      <span>{label}</span>
    </li>
  );
}

// About keeps the same “polaroid” vibe as Home, but sits higher on mobile.
export default function About() {
  // Data (easy to edit later)
  const langsFrameworks = [
    { Icon: SiHtml5, label: "HTML" },
    { Icon: SiCss3, label: "CSS" },
    { Icon: SiJavascript, label: "JavaScript" },
    { Icon: SiReact, label: "React" },
    { Icon: SiTailwindcss, label: "Tailwind CSS" },
  ];

  const design = [
    { Icon: FiSmartphone, label: "Responsive Design" },
    { Icon: FiTool, label: "Prototyping" },
    { Icon: FiUsers, label: "UX/UI" },
    { Icon: FiLayers, label: "High-fidelity Wireframes" },
    { Icon: FiActivity, label: "User Flows" },
    { Icon: FiInfo, label: "Information Architecture" },
  ];

  const tools = [
    { Icon: SiGithub, label: "GitHub" },
    { Icon: SiNetlify, label: "Netlify" },
    { Icon: SiVite, label: "Vite" },
    { Icon: FiCode, label: "Visual Studio Code" }, // ✅ swapped to FiCode
    { Icon: SiPostman, label: "Postman" },
    { Icon: SiCanva, label: "Canva" },
    { Icon: SiNextdotjs, label: "Next.js" },
    { Icon: SiFigma, label: "Figma" },
    { Icon: SiVercel, label: "Vercel" },
    { Icon: SiNpm, label: "npm" },
    { Icon: SiAdobephotoshop, label: "Adobe Photoshop" },
    // { Icon: SiAdobelightroom, label: "Adobe Lightroom" }, // ⚠️ removed
  ];

  const methodologies = [
    { Icon: FiRefreshCw, label: "Agile / Scrum" },
    { Icon: FiClipboard, label: "Project Management" },
    { Icon: FiTrendingUp, label: "Accessibility & SEO Optimization" },
  ];

  return (
    <section
      className="relative z-10 mx-auto max-w-[1100px]
        px-2 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10
        mt-6 sm:mt-8 lg:mt-10
        overflow-visible"
    >
      {/* Breadcrumbs: Home › About */}
      <Breadcrumbs
        className="text-sm opacity-80 mb-4"
        separator="›"
        items={[
          { label: "Home", href: "/" },
          { label: "About" }, // current page
        ]}
      />

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
              build experiences that feel intuitive, meaningful, and made with care. I`m looking forward to learn so much more in the future!
            </p>
          </div>
        </div>
      </div>

      {/* Skills & Tools */}
      <section className="mt-10 sm:mt-12 lg:mt-14 space-y-8">
        {/* Programming Languages & Frameworks */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 ring-1 ring-black/5 dark:ring-white/10">
          <h2 className="font-['Permanent_Marker'] text-2xl mb-4">
            Programming Languages & Frameworks
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm font-medium">
            {langsFrameworks.map(({ Icon, label }) => (
              <SkillChip key={label} Icon={Icon} label={label} />
            ))}
          </ul>
        </div>

        {/* Design */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 ring-1 ring-black/5 dark:ring-white/10">
          <h2 className="font-['Permanent_Marker'] text-2xl mb-4">Design</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-sm font-medium">
            {design.map(({ Icon, label }) => (
              <SkillChip key={label} Icon={Icon} label={label} />
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 ring-1 ring-black/5 dark:ring-white/10">
          <h2 className="font-['Permanent_Marker'] text-2xl mb-4">Tools</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm font-medium">
            {tools.map(({ Icon, label }) => (
              <SkillChip key={label} Icon={Icon} label={label} />
            ))}
          </ul>
        </div>

        {/* Methodologies */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 ring-1 ring-black/5 dark:ring-white/10">
          <h2 className="font-['Permanent_Marker'] text-2xl mb-4">Methodologies</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium">
            {methodologies.map(({ Icon, label }) => (
              <SkillChip key={label} Icon={Icon} label={label} />
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
