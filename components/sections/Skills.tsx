"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { HiArrowDown } from "react-icons/hi";
import {
  SiLaravel,
  SiSymfony,
  SiSpringboot,
  SiAngular,
  SiDocker,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiLinux,
  SiGit,
  SiPhp,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNginx,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const allSkills = [
  { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
  { name: "Symfony", icon: SiSymfony, color: "text-black dark:text-white" },
  { name: "Spring Boot", icon: SiSpringboot, color: "text-green-600" },
  { name: "PHP", icon: SiPhp, color: "text-indigo-500" },
  { name: "Java", icon: FaJava, color: "text-red-600" },
  { name: "Angular", icon: SiAngular, color: "text-red-600" },
  { name: "React", icon: SiReact, color: "text-cyan-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "MySQL", icon: SiMysql, color: "text-blue-600" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-800" },
  { name: "Docker", icon: SiDocker, color: "text-blue-500" },
  { name: "Linux", icon: SiLinux, color: "text-yellow-500" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "Nginx", icon: SiNginx, color: "text-green-600" },
];

export function Skills() {
  const t = useTranslations("skills");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen flex flex-col"
    >
      <motion.div
        className="container mx-auto px-6 flex-1 flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={categoryVariants} className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full px-2">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 md:gap-6">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillVariants}
                custom={index}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 },
                }}
                className="flex flex-col items-center justify-center p-3 md:p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
              >
                <skill.icon className={`w-8 h-8 md:w-14 md:h-14 ${skill.color} mb-1 md:mb-3`} />
                <span className="text-[10px] md:text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>

      <motion.button
        onClick={() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to contact"
      >
        <HiArrowDown className="w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
      </motion.button>
    </section>
  );
}
