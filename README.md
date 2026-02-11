# ProyectoZero.org

Portfolio personal y espacio de desarrollo web de Sergio Moreno.

## Sobre el Proyecto

ProyectoZero es mi portfolio personal donde combino mi pasión por el desarrollo web con mi trayectoria profesional. Un espacio moderno y minimalista construido con las últimas tecnologías, donde comparto mi experiencia como desarrollador en formación y TES con más de 20 años de trayectoria sanitaria.

## Características

- **Multiidioma:** Soporte completo para español y euskera
- **Modo Oscuro:** Tema claro/oscuro con transiciones suaves
- **Animaciones Fluidas:** Experiencia interactiva con Framer Motion
- **Contacto Integrado:** Formulario funcional conectado con Mailgun
- **Responsive:** Diseño adaptable a todos los dispositivos
- **Performance:** Optimizado con Next.js 15 y React 19

## Stack Tecnológico

- **Framework:** Next.js 16.1.6
- **UI:** React 19.2.3
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **Internacionalización:** next-intl
- **Temas:** next-themes
- **Email:** Mailgun.js
- **Lenguaje:** TypeScript 5

## Desarrollo Local

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/tuusuario/proyectozero.git
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
MAILGUN_API_KEY=tu_api_key
MAILGUN_DOMAIN=tu_dominio
CONTACT_EMAIL=your_contact_email_here
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Despliegue

El proyecto está desplegado en [Vercel](https://vercel.com) y disponible en:

**Producción:** [proyectozero.org](https://proyectozero.org)

Cada push a `main` despliega automáticamente gracias a la integración de Vercel con Git.

## Estructura del Proyecto

```
proyectozero/
├── app/
│   ├── [locale]/        # Rutas internacionalizadas
│   └── api/             # API routes
├── components/          # Componentes reutilizables
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
