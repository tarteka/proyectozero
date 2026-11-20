// Marca temporal de "acabo de cambiar de idioma". Al cambiar el segmento
// [locale] React vuelve a montar toda la página; con esta marca las animaciones
// de entrada se saltan para que el cambio no se vea como un parpadeo.

const KEY = "locale-switch";
const WINDOW_MS = 5000;

export function markLocaleSwitch() {
  try {
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // sessionStorage no disponible (modo privado, etc.): se ve la animación normal
  }
}

export function isRecentLocaleSwitch(): boolean {
  try {
    const stored = Number(sessionStorage.getItem(KEY));
    return stored > 0 && Date.now() - stored < WINDOW_MS;
  } catch {
    return false;
  }
}

export function clearLocaleSwitch() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // nada que limpiar
  }
}
