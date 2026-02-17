"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { HiMail, HiUser, HiPencil } from "react-icons/hi";

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-12 md:py-20 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col"
    >
      <motion.div
        className="container mx-auto px-6 flex-1 flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
            {t("subtitle")}
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12 w-full"
        >
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base"
              >
                <HiUser className="w-4 h-4 md:w-5 md:h-5" />
                {t("name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm md:text-base"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base"
              >
                <HiMail className="w-4 h-4 md:w-5 md:h-5" />
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm md:text-base"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base"
              >
                <HiPencil className="w-4 h-4 md:w-5 md:h-5" />
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none text-sm md:text-base"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: status === "loading" ? 1 : 1.05 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.95 }}
              className="w-full px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {status === "loading" ? t("sending") : t("send")}
            </motion.button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 md:p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-center font-semibold text-sm md:text-base"
              >
                {t("success")}
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 md:p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-center font-semibold text-sm md:text-base"
              >
                {t("error")}
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            O envíame un email directamente a{" "}
            <a
              href="mailto:sergimoreno@outlook.com"
              className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold"
            >
              sergimoreno@outlook.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
