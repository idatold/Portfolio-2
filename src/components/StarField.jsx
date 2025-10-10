import { useMemo } from "react";

export default function Starfield({
  count = 420,
  sizes = [1, 1, 1, 1, 2, 2, 3, 4],
}) {
  const stars = useMemo(() => {
    const bands = ["band1", "band2", "band3", "band4", "band5", "band6"];
    return Array.from({ length: count }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const band = bands[Math.floor((i / count) * bands.length)] ?? "band1";
      return { id: i, top, left, size, band };
    });
  }, [count, sizes]);

  return (
    <div
      className="ida-starfield"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: `linear-gradient(
          180deg,
          var(--grad-start) 0%,
          var(--grad-mid) var(--grad-mid-stop),
          var(--grad-end) 100%
        )`,
      }}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className={`ida-star ${s.band}`}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 2px rgba(255,255,255,.35)",
          }}
        />
      ))}
    </div>
  );
}
