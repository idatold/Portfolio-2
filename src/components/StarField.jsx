import { useMemo } from "react";

/**
 * Global starfield layer
 * - Fixed to viewport, sits under all content (z-index: 0)
 * - Renders random white dots with staggered twinkle bands
 * - Keeps your site gradient by painting it behind the stars
 */
export default function Starfield({
  count = 420,
  sizes = [1, 1, 1, 1, 2, 2, 3, 4], // more 1px stars for a classy look
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
        // Keep your CSS-variable gradient behind the stars
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
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
    </div>
  );
}
