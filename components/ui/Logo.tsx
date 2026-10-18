export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-8 w-8" aria-hidden>
        <defs>
          <mask id="logo-ring-cut">
            <rect width="100" height="100" fill="white" />
            <path d="M25 75 L75 25" stroke="black" strokeWidth="10" />
          </mask>
        </defs>

        <rect width="100" height="100" rx="22" className="fill-foreground" />

        <rect
          x="31"
          y="18"
          width="38"
          height="64"
          rx="19"
          fill="none"
          strokeWidth="9"
          className="stroke-background"
          mask="url(#logo-ring-cut)"
        />

        <path
          d="M25 75 L75 25"
          fill="none"
          strokeWidth="9"
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
