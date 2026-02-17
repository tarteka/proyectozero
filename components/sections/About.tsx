"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { HiAcademicCap, HiArrowDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export function About() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-12 md:py-20 bg-white dark:bg-gray-900 min-h-screen flex flex-col"
    >
      <motion.div
        className="container mx-auto px-6 flex-1 flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          {/* Profile Section */}
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            <motion.div
              variants={itemVariants}
              className="flex justify-center md:justify-start"
            >
              <motion.div
                className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-blue-600 dark:ring-blue-400 shadow-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/images/sergio-moreno.jpg"
                  alt="Sergio Moreno"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed">
                {t("intro")}
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 md:mb-6">
                {t("philosophy")}
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                <motion.a
                  href="https://github.com/tarteka"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">GitHub</span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/sergio-moreno-tes"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">LinkedIn</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Education Card */}
          <motion.div variants={cardVariants}>
            <motion.div
              className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 md:p-8 rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="bg-linear-to-r from-blue-600 to-purple-600 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                  <HiAcademicCap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {t("education")}
                </h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <Image
                    src="/images/Birt.svg"
                    alt="BIRTLH"
                    width={80}
                    height={30}
                    className="object-contain md:w-30 md:h-10"
                  />
                  <div>
                    <h4 className="text-base md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
                      {t("degree")}
                    </h4>
                    <p className="text-xs md:text-base text-gray-600 dark:text-gray-400">
                      {t("school")}
                    </p>
                  </div>
                </div>

                <motion.a
                  href="https://www.birt.eus/ciclo-formativo/desarrollo-de-aplicaciones-web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm md:text-base text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium"
                  whileHover={{ x: 5 }}
                >
                  Ver más sobre DAW en BIRT →
                </motion.a>

                <div className="pt-3 md:pt-4 border-t border-gray-300 dark:border-gray-600">
                  <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs md:text-sm font-semibold">
                    {t("status")}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        onClick={() => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to skills"
      >
        <HiArrowDown className="w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
      </motion.button>
    </section>
  );
}
