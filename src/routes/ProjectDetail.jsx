import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);
  const liveRef = useRef(null);

  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (project) document.title = `${project.title} — Ida Portfolio`;
  }, [project, reduceMotion]);

  async function handleCopyLink() {
    const href = window.location.href;
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      if (liveRef.current) {
        liveRef.current.textContent = "Link copied!";
        setTimeout(() => (liveRef.current.textContent = ""), 1200);
      }
      setTimeout(() => setCopied(false), 1200);
    } catch {
      const input = document.createElement("input");
      input.value = href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  if (!project) {
    return (
      <div className="glass-card rounded-2xl p-6 sm:p-8 text-center border border-white/15 ring-1 ring-black/5 dark:ring-white/10">
        <h1 className="font-['Permanent_Marker'] text-3xl md:text-4xl mb-2">Not found</h1>
        <p className="opacity-80 mb-6">We couldn’t find that project.</p>
        <div className="flex gap-3 justify-center">
          <Link className="underline glow-link" to="/">Go home</Link>
          <Link className="underline glow-link" to="/archive">Open the archive</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="mt-6 sm:mt-8 lg:mt-10 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        className="text-sm opacity-80"
        separator="›"
        items={[
          { label: "Home", href: "/" },
          { label: "Archive", href: "/archive" },
          { label: project.title }, // current page
        ]}
      />

      {/* Header card */}
      <header className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
        {/* Stack on mobile; row on md+. Center columns vertically on md+ */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          {/* Title */}
          <div>
            <h1 className="font-['Permanent_Marker'] text-4xl md:text-5xl leading-tight">
              {project.title}
            </h1>
          </div>

          {/* Actions — left-aligned on mobile; align with title on md+ */}
          <div className="mt-3 md:mt-0 self-start md:self-auto flex flex-wrap items-center gap-2 sm:gap-3 md:justify-end">
            {/* Live preview (only if present) */}
            {project.links?.demoUrl && (
              <span className="plop">
                <a
                  href={project.links.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap
                             rounded-xl px-3 text-sm leading-none cursor-pointer
                             border border-white/20 hover:border-[var(--accent)]
                             ring-1 ring-black/5 dark:ring-white/10
                             bg-white/5 transition hover:text-[var(--accent)]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label="Open live demo in a new tab"
                  title="Open live demo"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/>
                  </svg>
                  <span>Live preview</span>
                </a>
              </span>
            )}

            {/* Copy link */}
            <span className="plop">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap
                           rounded-xl px-3 text-sm leading-none cursor-pointer
                           border border-white/20 hover:border-[var(--accent)]
                           ring-1 ring-black/5 dark:ring-white/10
                           bg-white/5 transition hover:text-[var(--accent)]
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Copy link to this project"
                title="Copy link"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M10 4a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v1h-2V4Zm-6 6a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9v-2h3a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H4v-1Zm1 5h1v-1h2v1h1v2H8v1H6v-1H5v-2Z"/>
                </svg>
                <span>{copied ? "Copied!" : "Copy link"}</span>
              </button>
            </span>
          </div>
        </div>

        {/* Tech chips — match carousel */}
        {project.tech?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="text-xs font-medium tracking-wide px-2.5 py-1
                           rounded-md border border-white/20 bg-white/5 backdrop-blur
                           ring-1 ring-black/5 dark:ring-white/10"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {project.summary && (
          <p className="mt-4 opacity-90 max-w-prose">{project.summary}</p>
        )}
      </header>

      {/* Screenshot card */}
      <section
        className="glass-card rounded-2xl p-4 sm:p-5 border border-white/15 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
        aria-labelledby="screenshot-heading"
      >
        <h2 id="screenshot-heading" className="sr-only">Project screenshot</h2>
        <div className="group rounded-[18px] p-2 bg-white/80 dark:bg-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <figure className="relative rounded-[14px] overflow-hidden ring-1 ring-black/10 dark:ring-white/15">
            <img
              src={project.imgSrc}
              alt={project.imgAlt || project.title}
              className={`block w-full h-auto aspect-[16/9] object-cover
                          grayscale contrast-110
                          group-hover:grayscale-0 group-hover:contrast-100
                          transition ${reduceMotion ? "" : "duration-500"}`}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-black/5 dark:ring-white/10" />
          </figure>
        </div>
      </section>

      {/* Body card */}
      {(project.description?.length || project.highlights?.length) && (
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)] grid gap-6 md:grid-cols-5">
          {project.description?.length && (
            <div className="md:col-span-3 space-y-4">
              <h2 className="font-['Permanent_Marker'] text-2xl">Description</h2>
              {project.description.map((para, i) => (
                <p key={i} className="opacity-90">{para}</p>
              ))}
            </div>
          )}

          {project.highlights?.length && (
            <div className="md:col-span-2">
              <h2 className="font-['Permanent_Marker'] text-2xl mb-3">Features</h2>
              <ul className="list-disc pl-5 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="opacity-90">{h}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Links card */}
      {(project.links?.demoUrl || project.links?.repoUrl) && (
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
          <h2 className="font-['Permanent_Marker'] text-2xl mb-4">Links</h2>
          <div className="flex flex-wrap gap-3">
            {project.links?.demoUrl && (
              <span className="plop">
                <a
                  href={project.links.demoUrl}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2
                             border border-white/20 hover:border-[var(--accent)]
                             ring-1 ring-black/5 dark:ring-white/10
                             bg-white/5 transition underline-offset-4 hover:underline glow-link"
                  target="_blank" rel="noreferrer"
                >
                  Live demo
                </a>
              </span>
            )}
            {project.links?.repoUrl && (
              <span className="plop">
                <a
                  href={project.links.repoUrl}
                  aria-label="GitHub repository (opens in new tab)"
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2
                             border border-white/20 hover:border-[var(--accent)]
                             ring-1 ring-black/5 dark:ring-white/10
                             bg-white/5 transition glow-link"
                  target="_blank" rel="noreferrer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05.8-.23 1.65-.35 2.5-.35s1.7.12 2.5.35c1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.21 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
                  </svg>
                  <span>Repo</span>
                </a>
              </span>
            )}
          </div>
        </section>
      )}

      {/* A11y live region for copy feedback */}
      <p ref={liveRef} aria-live="polite" className="sr-only" />
    </article>
  );
}
