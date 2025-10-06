import { useEffect, useMemo, useRef, useState } from "react";

export default function TypewriterHeading({
  text,
  as: Tag = "h1",
  start = false,
  startDelayMs = 360,   // small pre-pause before first char
  charDelayMs = 100,    // comfy base speed (parent can override)
  endBlinkMs = 0,       // how long to keep caret blinking after finish
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
  const [typingDone, setTypingDone] = useState(false);
  const [caretOn, setCaretOn] = useState(false); // caret visibility controller

  // keep latest onDone without retriggering the effect
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // reset if the text changes
  useEffect(() => {
    setOut("");
    setTypingDone(false);
    setCaretOn(false);
  }, [text]);

  useEffect(() => {
    let tId;   // typing timer
    let endId; // post-finish blink timer
    let cancel = false;

    if (reduceMotion) {
      setOut(text);
      setTypingDone(true);
      setCaretOn(false);
      onDoneRef.current?.();
      return () => {};
    }

    if (!start || typingDone) return () => {};

    setCaretOn(true); // show caret as soon as we start

    let i = 0;
    const isPauseChar = (ch) => /[.,!?;:]/.test(ch);

    const tick = (delay) => {
      tId = setTimeout(() => {
        if (cancel) return;

        i += 1;
        setOut(text.slice(0, i));

        if (i >= text.length) {
          setTypingDone(true);
          onDoneRef.current?.();

          // keep caret for a couple of blinks if requested, then hide
          if (endBlinkMs > 0) {
            endId = setTimeout(() => setCaretOn(false), endBlinkMs);
          } else {
            setCaretOn(false);
          }
          return;
        }

        // steady base + tiny, human jitter
        const jitter = Math.floor(Math.random() * 31) - 10; // -10..+20ms
        let next = Math.max(60, charDelayMs + jitter);

        // small breath after punctuation (kept subtle)
        if (isPauseChar(text[i - 1])) next += 100;

        tick(next);
      }, delay);
    };

    tick(startDelayMs);

    return () => {
      cancel = true;
      if (tId) clearTimeout(tId);
      if (endId) clearTimeout(endId);
    };
  }, [start, text, charDelayMs, startDelayMs, reduceMotion, endBlinkMs, typingDone]);

  // caret shows while typing or during the end-blink hold
  const showCaret = !reduceMotion && caretOn;

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">
        {out}
        {showCaret ? <span className="type-caret" /> : null}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
