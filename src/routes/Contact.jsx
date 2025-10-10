import { useRef, useState } from "react";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
if (!ACCESS_KEY) {
  console.warn("Web3Forms key missing: set VITE_WEB3FORMS_KEY in .env.local");
}

export default function Contact() {
  const statusRef = useRef(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!ACCESS_KEY) {
      setStatus("Missing API key. Please try again later.");
      statusRef.current?.focus?.();
      return;
    }

    try {
      setSending(true);
      setStatus("Sending…");
      const form = e.currentTarget;
      const data = new FormData(form);

      data.append("access_key", ACCESS_KEY);
      data.append("subject", "New message from Ida’s Portfolio");
      data.append("from_name", "Ida Portfolio");

      if (!data.get("replyto") && data.get("email")) {
        data.append("replyto", data.get("email"));
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("Form submitted successfully. Thank you! 🎉");
        form.reset();
        statusRef.current?.focus?.();
      } else {
        setStatus(json.message || "Something went wrong. Please try again.");
        statusRef.current?.focus?.();
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Web3Forms submit failed:", err);
      }
      setStatus("Network error. Please check your connection and try again.");
      statusRef.current?.focus?.();
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      className="relative z-10 mx-auto max-w-[1100px]
                 px-2 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10
                 mt-12 sm:mt-16 lg:mt-22"
    >
      <div
        className="grid grid-cols-1 gap-5 sm:gap-7 lg:gap-8 items-stretch isolate
                   rounded-lg sm:rounded-2xl p-3 sm:p-6 lg:p-8
                   ring-1 ring-black/10 dark:ring-white/20
                   glass-card backdrop-blur-xl
                   shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
                   border border-white/30 dark:border-white/10"
      >
        {/* Heading + Form */}
        <div className="flex flex-col gap-6 max-w-prose mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl">Hello!</h1>
          <p>Send me a note and I’ll get back to you. I read everything. 💌</p>

          {/* Status region (focusable for a11y) */}
          <p
            ref={statusRef}
            id="form-status"
            aria-live="polite"
            tabIndex={-1}
            className="sr-only"
          >
            {status}
          </p>

          <form onSubmit={onSubmit} className="grid gap-4 sm:gap-5">
            {/* Honeypot (hidden so WAVE won't flag it) */}
            <input type="hidden" name="botcheck" />

            {/* Name */}
            <div className="grid gap-1">
              <label htmlFor="contact-name" className="font-medium">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className="rounded-lg px-3 py-2
                           ring-1 ring-black/10 dark:ring-white/15
                           bg-white/60 dark:bg-white/5
                           dark:text-white dark:placeholder-white/70 placeholder:opacity-60
                           backdrop-blur
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </div>

            {/* Email */}
            <div className="grid gap-1">
              <label htmlFor="contact-email" className="font-medium">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Your email"
                className="rounded-lg px-3 py-2
                           ring-1 ring-black/10 dark:ring-white/15
                           bg-white/60 dark:bg-white/5
                           dark:text-white dark:placeholder-white/70 placeholder:opacity-60
                           backdrop-blur
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </div>

            {/* Message */}
            <div className="grid gap-1">
              <label htmlFor="contact-message" className="font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Your message"
                className="rounded-lg px-3 py-2
                           ring-1 ring-black/10 dark:ring-white/15
                           bg-white/60 dark:bg-white/5
                           dark:text-white dark:placeholder-white/70 placeholder:opacity-60
                           backdrop-blur
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] resize-y"
              />
            </div>

            {/* Optional explicit reply-to (hidden) */}
            <input type="hidden" name="replyto" value="" />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg
                           border border-white/30 dark:border-white/20
                           bg-white/30 dark:bg-white/10 backdrop-blur
                           ring-1 ring-black/10 dark:ring-white/20
                           transition active:translate-y-[1px]
                           hover:border-[var(--accent)]
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
                           cursor-pointer disabled:cursor-not-allowed"
              >
                {sending ? "Sending…" : "Send message"}
              </button>

              {/* Inline visual status for sighted users */}
              <span aria-hidden="true" className="opacity-80">
                {status && status !== "Sending…" ? status : ""}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
