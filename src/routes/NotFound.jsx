// src/routes/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 text-center">
      <h1 className="font-['Permanent_Marker'] text-4xl mb-2">404</h1>
      <p className="opacity-80 mb-6">This page doesn’t exist (yet!).</p>
      <div className="flex gap-3 justify-center">
        <Link className="underline glow-link" to="/">Go home</Link>
        <Link className="underline glow-link" to="/projects">Open the archive</Link>
      </div>
    </div>
  );
}
