// src/routes/Archive.jsx
import { Link } from "react-router-dom";
import projects from "../data/projects";

export default function Archive() {
  return (
    <section className="glass-card rounded-2xl p-6 sm:p-8">
      <h1 className="font-['Permanent_Marker'] text-4xl mb-4">Archive</h1>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <li key={p.id} className="rounded-xl border border-white/15 p-4">
            <Link to={`/archive/${p.slug}`} className="block glow-link">
              <img
                src={p.imgSrc}
                alt={p.imgAlt || p.title}
                className="w-full aspect-[16/9] object-cover rounded-lg mb-3 grayscale hover:grayscale-0 transition"
              />
              <h2 className="text-lg font-medium">{p.title}</h2>
              {p.line1 && <p className="opacity-80 text-sm">{p.line1}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
