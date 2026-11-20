"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiMail } from "react-icons/hi";
import { HiArrowRight, HiCheck, HiXMark } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EMAIL = "contacto@proyectozero.org";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, "required" | "invalid">>;

const buttonColors = {
  idle: "bg-accent text-accent-foreground hover:opacity-90",
  loading: "bg-accent text-accent-foreground",
  success: "bg-success text-background",
  error: "bg-danger text-background",
} as const;

const buttonLabels = {
  idle: "send",
  loading: "sending",
  success: "sent",
  error: "failed",
} as const;

const inputClass =
  "w-full rounded-none border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:shadow-[3px_3px_0_0_var(--accent)]";

const invalidInputClass =
  "border-danger shadow-[3px_3px_0_0_var(--danger)]";

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm font-medium text-danger">
      <span
        className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center border border-current font-mono text-[11px] leading-none"
        aria-hidden
      >
        !
      </span>
      {message}
    </p>
  );
}

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

  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (): FieldErrors => {
    const result: FieldErrors = {};
    if (!formData.name.trim()) result.name = "required";
    if (!formData.email.trim()) result.email = "required";
    else if (!EMAIL_PATTERN.test(formData.email.trim())) result.email = "invalid";
    if (!formData.message.trim()) result.message = "required";
    return result;
  };

  const errorText = (field: Field): string | null => {
    const kind = errors[field];
    if (!kind) return null;
    if (field === "name") return t("validation.nameRequired");
    if (field === "message") return t("validation.messageRequired");
    return kind === "invalid" ? t("validation.emailInvalid") : t("validation.emailRequired");
  };

  const fieldProps = (field: Field) => ({
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // El aviso de un campo desaparece en cuanto se vuelve a editar
    setErrors((prev) => (prev[name as Field] ? { ...prev, [name]: undefined } : prev));
  };

  return (
    <section
      id="contact"
      className="border-t border-line py-24 md:py-32"
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
              className="group lift inline-flex items-center gap-3 rounded-none border border-line bg-surface px-4 py-3 text-sm font-medium text-foreground"
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-line text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sergio-moreno-tes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-line text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="shadow-block space-y-5 border border-line bg-surface p-6 md:p-8"
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
                  placeholder={t("namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.name ? invalidInputClass : ""}`}
                  {...fieldProps("name")}
                />
                {errorText("name") && <FieldError id="name-error" message={errorText("name")!} />}
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
                  spellCheck={false}
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.email ? invalidInputClass : ""}`}
                  {...fieldProps("email")}
                />
                {errorText("email") && <FieldError id="email-error" message={errorText("email")!} />}
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
                autoComplete="off"
                placeholder={t("messagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`${inputClass} resize-none ${errors.message ? invalidInputClass : ""}`}
                {...fieldProps("message")}
              />
              {errorText("message") && (
                <FieldError id="message-error" message={errorText("message")!} />
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`group inline-flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-none px-6 text-sm font-semibold transition-[opacity,background-color,color] duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${buttonColors[status]}`}
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

            <div role="status" aria-live="polite">
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-danger bg-danger/10 p-3 text-center text-sm font-medium text-danger"
                >
                  {t("error")}
                </motion.div>
              )}
            </AnimatePresence>
            </div>
            <p role="status" aria-live="polite" className="sr-only">
              {status === "success" ? t("sent") : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
