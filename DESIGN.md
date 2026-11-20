# DESIGN.md — proyectozero.org

Sistema de diseño del portfolio de Sergio Moreno. Sigue este documento al crear o modificar UI.
Fuente de verdad de los valores: `app/globals.css`.

## Carácter

Sobrio, técnico y editorial. Un portfolio de desarrollador backend con guiños de terminal (mono, `$`, cursor parpadeante, ventanas de terminal), no una landing de marketing. Un único acento cálido sobre neutros casi monocromos. Nada decorativo que no aporte información.

## Color

Tokens semánticos (Tailwind: `bg-background`, `text-muted`, `border-border`, `text-accent`…). Nunca usar hex sueltos salvo colores de marca de tecnologías (iconos de Skills) y los tres puntos de ventana.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| background | #fafaf9 | #0b0b0d | Fondo de página |
| surface | #ffffff | #141417 | Tarjetas, formularios |
| surface-muted | #f4f4f2 | #1a1a1e | Barras, chips, fondos alternos |
| foreground | #18181b | #f4f4f5 | Texto principal |
| muted | #5f5f66 | #a1a1aa | Texto secundario |
| subtle | #8a8a93 | #71717a | Metadatos, eyebrows (solo texto no esencial) |
| border | #e6e6e3 | #26262b | Todos los bordes |
| accent | #e2532d | #f0714e | Único acento: CTA, índices, énfasis |
| success / warning / info | + `-soft` | + `-soft` | Estados de proyecto |

Reglas: tema oscuro por defecto (`defaultTheme="dark"`). Un solo acento por vista; el color nunca es la única señal de estado.

## Tipografía

- Sans: Geist (`font-sans`). Mono: Geist Mono (`font-mono`) para eyebrows, periodos, chips, comandos.
- Hero h1: `text-5xl → lg:text-8xl`, `font-semibold tracking-tighter`.
- h2 de sección: `text-3xl md:text-5xl font-semibold tracking-tight`.
- h3 de tarjeta: `text-lg md:text-xl font-semibold tracking-tight`.
- Cuerpo: `text-base md:text-lg leading-relaxed text-muted`.
- Eyebrow: `font-mono text-xs uppercase tracking-[0.2em] text-subtle` con índice en acento (`01 / Sobre mí`).
- Títulos con `text-wrap: balance`; párrafos con `text-wrap: pretty`; cifras con `tabular-nums`.
- Marca y nombres propios de tecnologías: `translate="no"`.

## Layout

- Contenedor: `mx-auto max-w-6xl px-6`.
- Secciones: `py-24 md:py-32`, separadas por `border-t border-border`; alternan fondo liso y `bg-surface-muted/40 bg-dots`.
- Orden: Hero → Sobre mí (01) → Experiencia (02) → Proyectos (03) → Stack (04) → Contacto (05).
- Cada sección con `id` y `scroll-margin-top` para la navbar fija (h-16).
- Mobile first; nada de scroll horizontal; objetivos táctiles ≥ 36px (idealmente 44px).

## Formas y superficies (brutalista suave)

- **Sin esquinas redondeadas**: los tokens `--radius-*` valen 0. Solo son redondos los puntos de estado, el spinner y el brillo del Hero.
- Bordes marcados: `border border-line` (token `--line`) en tarjetas, botones, chips, inputs, selectores y separadores de sección. `border-border` queda para tramas y detalles muy sutiles.
- Sin sombras difuminadas. Dos recursos: `.shadow-block` (sombra dura estática de 4px en el color de línea) para contenedores grandes (foto, terminal de Stack, formulario) y `.lift` (al pasar el ratón sube 2px y aparece sombra dura de 4px en acento) para tarjetas interactivas.
- Chips: `border border-line bg-surface-muted font-mono text-[11px]`.
- Botón primario: `bg-accent text-accent-foreground border border-line` con `.lift`. Secundario: `border border-line bg-surface`.
- Logos de centros de formación en recuadro rectangular: fondo blanco para Birt y fondo `#18181b` para Easo y Osoki (logos blancos).
- Motivo recurrente: ventana de terminal/navegador (barra `h-9` con tres puntos + ruta mono) en Proyectos y Stack.

## Movimiento

- Entrada con `Reveal` (fade + 20px, 0.7s, ease `[0.22, 1, 0.36, 1]`), solo `transform` y `opacity`.
- Respetar siempre `prefers-reduced-motion` (`useReducedMotionSafe` y regla global en CSS).
- Nunca `transition: all`; listar propiedades (`transition-colors`, `transition-opacity`, `transition-transform`).
- Máximo un efecto "con personalidad" por sección (tipeo del nombre, estática de la foto, spotlight).

## Interacción y accesibilidad

- Foco visible global: anillo de 2px en `accent` con `:focus-visible`; nunca `outline-none` sin sustituto.
- Enlace "saltar al contenido" al inicio; `<main id="main">`.
- Botones solo-icono con `aria-label`; iconos decorativos `aria-hidden`.
- Navegación con `<a>`, acciones con `<button>`.
- Formularios: `label` asociado, `autoComplete`, `type` correcto, placeholders con ejemplo y `…`, errores en región `role="status"`/`aria-live="polite"`.
- Contraste mínimo AA: `subtle` no se usa para información necesaria.

## i18n

Idiomas `es` (por defecto, sin prefijo) y `eu` (`/eu`). Todo texto visible vive en `messages/{es,eu}.json`; no hardcodear cadenas en componentes. Fechas y números con `Intl.*`.
