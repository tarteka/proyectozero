"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This setState on mount is intentional to avoid SSR/client hydration mismatch for next-themes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const baseClass =
    "cursor-pointer fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 w-12 h-12 hover:shadow-xl transition-shadow";

  if (!mounted) {
    // SSR y primer render cliente iguales
    return <motion.button className={baseClass} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={baseClass}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <HiSun className="w-6 h-6 text-yellow-500" />
      ) : (
        <HiMoon className="w-6 h-6 text-gray-700" />
      )}
    </motion.button>
  );
}
