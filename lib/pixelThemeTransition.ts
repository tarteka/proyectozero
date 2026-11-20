// Transición de tema "en píxeles": el nuevo tema se revela como una onda de
// bloques cuadrados que sale del punto (x, y). Usa la API View Transitions:
// el navegador congela el aspecto anterior y recortamos la capa nueva con un
// clip-path formado por la unión de cuadrados que va creciendo.

const STEPS = 28;
const DURATION = 900;
const COLUMNS = 24;

function buildFrames(x: number, y: number, width: number, height: number) {
  const size = Math.max(36, Math.ceil(Math.max(width, height) / COLUMNS));
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const ox = x / size;
  const oy = y / size;

  const corners: [number, number][] = [
    [0, 0],
    [cols, 0],
    [0, rows],
    [cols, rows],
  ];
  const maxDistance = Math.max(...corners.map(([cx, cy]) => Math.hypot(cx - ox, cy - oy)));

  // Cada bloque se activa cuando el progreso supera su "umbral": distancia al
  // origen más un poco de azar, para que el borde de la onda sea irregular.
  const cells: { x: number; y: number; threshold: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const distance = Math.hypot(col + 0.5 - ox, row + 0.5 - oy) / maxDistance;
      cells.push({
        x: col * size,
        y: row * size,
        threshold: distance * 0.86 + Math.random() * 0.14,
      });
    }
  }

  const frames: string[] = ["path('M0 0')"];
  for (let step = 1; step <= STEPS; step++) {
    const progress = step / STEPS;
    let d = "";
    for (const cell of cells) {
      if (cell.threshold <= progress) {
        d += `M${cell.x} ${cell.y}h${size}v${size}h-${size}z`;
      }
    }
    frames.push(`path('${d || "M0 0"}')`);
  }
  return frames;
}

export function pixelThemeTransition(origin: HTMLElement, applyTheme: () => void) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || typeof document.startViewTransition !== "function") {
    applyTheme();
    return;
  }

  const rect = origin.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const { innerWidth: width, innerHeight: height } = window;

  const transition = document.startViewTransition(applyTheme);

  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: buildFrames(x, y, width, height) },
        {
          duration: DURATION,
          easing: "linear",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // Si la transición se cancela, el cambio de tema ya está aplicado.
    });
}
