export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-8 w-8" aria-hidden>
        <rect width="100" height="100" rx="22" className="fill-foreground" />
        <rect x="32" y="23" width="36" height="54" rx="18" className="fill-background" />
        <rect x="46.5" y="15" width="7" height="70" className="fill-foreground" />
        <line
          x1="28"
          y1="72"
          x2="72"
          y2="28"
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
