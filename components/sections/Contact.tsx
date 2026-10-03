"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiMail } from "react-icons/hi";
import { HiArrowRight, HiCheck, HiXMark } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EMAIL = "sergimoreno@outlook.com";

const buttonColors = {
  idle: "bg-foreground text-background hover:opacity-90",
  loading: "bg-foreground text-background",
  success: "bg-success text-background",
  error: "bg-accent text-accent-foreground",
} as const;

const buttonLabels = {
  idle: "send",
  loading: "sending",
  success: "sent",
  error: "failed",
} as const;

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

export function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.15fr] md:gap-16">
        <div>
          <SectionHeading
            index="05"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            className="mb-10"
          />

          <Reveal delay={0.1} className="space-y-4">
            <p className="text-sm text-muted">{t("orEmail")}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <HiMail className="h-4 w-4" />
              </span>
              {EMAIL}
            </a>

            <div className="flex gap-2 pt-2">
              <a
                href="https://github.com/tarteka"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sergio-moreno-tes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              aria-live="polite"
              className={`group inline-flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold transition-[opacity,background-color,color] duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${buttonColors[status]}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  {status === "loading" && (
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      aria-hidden
                    />
                  )}
                  {status === "success" && <HiCheck className="h-4 w-4" />}
                  {status === "error" && <HiXMark className="h-4 w-4" />}
                  {t(buttonLabels[status])}
                  {status === "idle" && (
                    <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg bg-accent-soft p-3 text-center text-sm font-medium text-accent"
                >
                  {t("error")}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
