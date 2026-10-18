"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * useReducedMotion() de framer-motion resuelve `window.matchMedia` de forma
 * síncrona en el primer render del cliente, antes de terminar la hidratación.
 * Si el SO/navegador tiene activada la preferencia de movimiento reducido,
 * ese primer valor (`true`) no coincide con el `null` renderizado en el
 * servidor y React lanza un error de hidratación. Se ignora el valor real
 * hasta después del montaje, cuando ya no hay HTML de servidor con el que
 * comparar.
 */
export function useReducedMotionSafe() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted ? prefersReducedMotion : false;
}
