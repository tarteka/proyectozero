import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      {...props}
      className="mt-12 mb-5 scroll-mt-24 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-9 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground md:text-2xl"
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      {...props}
      className="mt-8 mb-3 scroll-mt-24 text-lg font-semibold tracking-tight text-foreground"
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="my-5 text-base leading-relaxed text-muted md:text-lg">
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className="my-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted marker:text-accent md:text-lg"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className="my-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted marker:text-accent md:text-lg"
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="pl-1">
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-accent pl-5 text-base italic leading-relaxed text-muted md:text-lg"
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr {...props} className="my-10 border-line" />,
  img: ({ alt, ...props }) => (
    // Las imágenes de los artículos son contenido local y no siempre traen
    // dimensiones conocidas; se sirven como <img> para no romper el layout.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      className="my-8 h-auto max-w-full border border-line bg-surface-muted"
    />
  ),
  code: ({ children, ...props }) => (
    <code
      {...props}
      className="border border-line bg-surface-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <div className="shadow-block my-7 max-w-full overflow-hidden border border-line bg-surface-muted">
      <div
        className="flex h-9 items-center gap-3 border-b border-line bg-surface-muted px-4"
        aria-hidden
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="truncate font-mono text-[11px] text-subtle">
          ~/blog/snippet.mdx
        </span>
      </div>
      <pre
        {...props}
        className="max-w-full overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[13px] [&_code]:text-inherit"
      >
        {children}
      </pre>
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
