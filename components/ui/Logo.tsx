export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-8 w-8" aria-hidden>
        <rect width="100" height="100" rx="22" className="fill-foreground" />
        <circle
          cx="50"
          cy="50"
          r="27"
          fill="none"
          strokeWidth="8"
          className="stroke-background"
        />
        <line
          x1="23"
          y1="77"
          x2="77"
          y2="23"
          strokeWidth="8"
          strokeLinecap="round"
          className="stroke-accent"
        />
      </svg>
      <span className="text-[20px] font-semibold tracking-tight text-foreground">
        proyecto<span className="text-accent">zero</span>
      </span>
    </span>
  );
}
