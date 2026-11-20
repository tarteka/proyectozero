"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import { clearLocaleSwitch, isRecentLocaleSwitch } from "@/lib/localeSwitch";

const InstantEntranceContext = createContext(false);

/**
 * `true` si la página se acaba de montar por un cambio de idioma: las
 * animaciones de entrada (tipeo, contadores…) deben mostrarse ya terminadas.
 * Se fija con el valor del primer render para que no cambie a mitad de vida.
 */
export function useInstantEntrance() {
  const value = useContext(InstantEntranceContext);
  const [initial] = useState(value);
  return initial;
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [instant, setInstant] = useState(
    () => typeof window !== "undefined" && isRecentLocaleSwitch(),
  );

  useEffect(() => {
    if (!instant) return;
    const id = window.setTimeout(() => {
      clearLocaleSwitch();
      setInstant(false);
    }, 1500);
    return () => window.clearTimeout(id);
  }, [instant]);

  return (
    <MotionConfig reducedMotion="user" skipAnimations={instant}>
      <InstantEntranceContext.Provider value={instant}>
        {children}
      </InstantEntranceContext.Provider>
    </MotionConfig>
  );
}
