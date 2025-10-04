import { useEffect, useMemo, useRef, useState } from "react";

export default function TypewriterHeading({
  text,
  as: Tag = "h1",
  start = false,
  startDelayMs = 450,   // snappier start
  charDelayMs = 95,     // slightly slower per-char
  className = "",
  onDone,
}) {
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  // keep latest onDone without re-running the typing effect
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!start || done) return;

    if (reduceMotion) {
      setOut(text);
      setDone(true);
      onDoneRef.current?.();
      return;
    }

    let i = 0;
    let cancel = false;
    let tId; // <- plain JS

    const isPauseChar = (ch) => /[.,!?;:]/.test(ch);

    const scheduleNext = (delay) => {
      tId = setTimeout(() => {
        if (cancel) return;

        i += 1;
        setOut(text.slice(0, i));

        if (i >= text.length) {
          setDone(true);
          onDoneRef.current?.();
          return;
        }

        // base speed
        let nextDelay = charDelayMs;

        // gentle ease-out near the end so it doesn't sprint
        const progress = i / text.length; // 0 → 1
        nextDelay *= 0.9 + progress * 0.35; // up to ~35% more delay by the end

        // micro-pause after punctuation for readability
        if (isPauseChar(text[i - 1])) nextDelay += 220;

        scheduleNext(nextDelay);
      }, delay);
    };

    // start after trimmed initial delay
    scheduleNext(startDelayMs);

    return () => {
      cancel = true;
      if (tId) clearTimeout(tId);
    };
    // deps intentionally exclude onDone to avoid restarts
  }, [start, text, charDelayMs, startDelayMs, reduceMotion, done]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">
        {out}
        {!reduceMotion && !done ? <span className="type-caret" /> : null}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
