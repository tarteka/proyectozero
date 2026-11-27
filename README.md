# ProyectoZero.org

Portfolio personal y espacio de desarrollo web de Sergio Moreno.

## Sobre el Proyecto

ProyectoZero es mi portfolio personal donde combino mi pasión por el desarrollo web con mi trayectoria profesional. Un espacio moderno y minimalista construido con las últimas tecnologías, donde comparto mi experiencia como desarrollador en formación y TES con más de 20 años de trayectoria sanitaria.

## Características

- **Multiidioma:** Soporte completo para español y euskera
- **Modo Oscuro:** Tema claro/oscuro con transiciones suaves
- **Animaciones Fluidas:** Experiencia interactiva con Framer Motion
- **Contacto Integrado:** Formulario funcional conectado con Resend
- **Responsive:** Diseño adaptable a todos los dispositivos
- **Performance:** Optimizado con Next.js 15 y React 19

## Stack Tecnológico

- **Framework:** Next.js 16.1.6
- **UI:** React 19.2.3
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **Internacionalización:** next-intl
- **Temas:** next-themes
- **Email:** Resend
- **Lenguaje:** TypeScript 5

## Desarrollo Local

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/tarteka/proyectozero.git
cd proyectozero
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y verás la aplicación corriendo.

## Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
RESEND_API_KEY=tu_api_key
RESEND_FROM_EMAIL=contacto@proyectozero.org
CONTACT_EMAIL=your_contact_email_here
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Blog

El blog vive en `content/blog/` y se escribe en MDX. No hay CMS ni base de
datos: los artículos se publican con el despliegue habitual de Vercel.

### Estructura y slugs

```bash
content/blog/
├── es/
│   ├── mi-primer-articulo.mdx
│   └── otro-articulo.mdx
└── eu/
    └── mi-primer-articulo.mdx   # misma slug = traducción
```

- El nombre del archivo, sin `.mdx`, es el slug (`mi-primer-articulo`).
- Usa solo minúsculas, números y guiones: `^[a-z0-9]+(?:-[a-z0-9]+)*$`.
- Para que dos artículos sean traducción uno del otro, deben tener el mismo
  nombre de archivo en `es/` y `eu/`.
- Un artículo puede publicarse en un solo idioma. En el otro idioma se muestra
  un aviso con enlace a la versión original.
- Los archivos `ejemplo-*` del repositorio son borradores de prueba, no
  contenido definitivo. No aparecen en producción.

### Formato de un artículo

Cada archivo MDX debe exportar `metadata` y, después, el contenido:

````mdx
export const metadata = {
  title: "Título del artículo",
  description: "Resumen breve que se muestra en el listado y en los metadatos.",
  date: "2026-11-27", // YYYY-MM-DD
  tags: ["Next.js", "Backend"],
  draft: true,
};

## Primer apartado

Contenido en Markdown/MDX.

### Código

```ts
const ejemplo = "Los bloques de código usan el motivo de terminal";
```

### Imágenes

![Texto alternativo](/images/blog/mi-imagen.png)
````

- `title`, `description`, `date`, `tags` y `draft` son obligatorios.
- `date` debe ser una fecha real en formato `YYYY-MM-DD`.
- `tags` es una lista de textos no vacíos.
- `draft` debe ser `true` o `false`. Mientras sea `true`, el artículo no se
  publica.
- Las imágenes deben estar en `public/` y referenciarse con una ruta absoluta,
  por ejemplo `/images/blog/mi-imagen.png`.
- No escribas un `# Título` al principio: la página ya renderiza el `title` de
  los metadatos como encabezado principal. Empieza por `##`.

### Previsualizar borradores

En desarrollo (`npm run dev`) los borradores se muestran siempre, con una
etiqueta «Borrador».

Para previsualizar borradores en un despliegue de preview de Vercel, define
`BLOG_PREVIEW=true` en el entorno **Preview** del proyecto. Para probar un
build de preview en local, define ambas variables antes de `npm run build`:

```env
BLOG_PREVIEW=true
VERCEL_ENV=preview
```

Los borradores **nunca** se muestran en producción, aunque `BLOG_PREVIEW` esté
mal configurada: fuera del modo de desarrollo solo se muestran si
`VERCEL_ENV` es explícitamente `preview`. No incluyas estas variables en el
entorno de producción.

### Publicar un artículo

1. Cambia `draft: true` a `draft: false` en el archivo MDX.
2. Comprueba el contenido con `npm run dev`.
3. Haz commit y push a `main`.
4. Vercel genera el despliegue; el artículo aparece en `/blog` o `/eu/blog`,
   entra en el sitemap y se genera su `BlogPosting`.

Los artículos no publicados no aparecen en el listado, no entran en
`generateStaticParams`, no se anuncian en el sitemap y responden con 404 si se
intenta abrir su URL directamente en producción.

### Añadir una traducción

Crea un archivo con el mismo slug en el otro idioma:

```bash
# Ejemplo
content/blog/es/mi-primer-articulo.mdx
content/blog/eu/mi-primer-articulo.mdx
```

Traduce `title`, `description`, `tags` y el contenido. La fecha puede ser la
misma. Si la traducción aún no existe, la versión publicada sigue funcionando y
la ruta del otro idioma muestra un aviso no indexable con enlace a la original.

### Rutas

- `/blog` y `/eu/blog`: listado de artículos publicados, del más reciente al
  más antiguo.
- `/blog/[slug]` y `/eu/blog/[slug]`: artículo en español o euskera.
- Si el artículo no existe en ningún idioma, la respuesta es 404.

## Despliegue

El proyecto está desplegado en [Vercel](https://vercel.com) y disponible en:

**Producción:** [proyectozero.org](https://proyectozero.org)

Cada push a `main` despliega automáticamente gracias a la integración de Vercel con Git.

## Estructura del Proyecto

```bash
proyectozero/
├── app/
│   ├── [locale]/        # Rutas internacionalizadas
│   └── api/             # API routes
├── components/          # Componentes reutilizables
├── content/blog/        # Artículos MDX (es, eu)
├── lib/                 # Utilidades y helpers
├── messages/            # Traducciones (es, eu)
└── public/              # Recursos estáticos
```

## Filosofía

"Aprender, disfrutar del camino y no perder nunca la sonrisa."

Este proyecto refleja mi compromiso con el aprendizaje continuo y la mejora constante en el desarrollo web.

## Contacto

- **Web:** [proyectozero.org](https://proyectozero.org)
- **Email:** Disponible a través del formulario de contacto

---

Desarrollado con pasión por Sergio Moreno | 2026
