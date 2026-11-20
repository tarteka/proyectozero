"use client";

import { useLocale } from "next-intl";
import { useLayoutEffect } from "react";

/**
 * Mantiene `<html lang>` al día cuando cambia el idioma. El layout raíz no se
 * vuelve a renderizar al navegar entre /es y /eu, así que el atributo se
 * actualiza aquí, antes del pintado.
 */
export function HtmlLang() {
  const locale = useLocale();

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
