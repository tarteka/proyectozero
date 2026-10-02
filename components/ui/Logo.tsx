export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-7 w-7" aria-hidden>
        <rect width="100" height="100" rx="22" className="fill-foreground" />
        <ellipse
          cx="50"
          cy="50"
          rx="22"
          ry="27"
          fill="none"
          strokeWidth="9"
          className="stroke-background"
        />
        <circle cx="50" cy="50" r="6" className="fill-accent" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        proyecto<span className="text-accent">zero</span>
      </span>
    </span>
  );
}
