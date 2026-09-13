type Props = { className?: string; size?: number }

export function Sigil({ className = '', size = 48 }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="32" cy="32" r="18" stroke="#a855f7" strokeWidth="1.2" opacity="0.8" />
      <circle cx="32" cy="32" r="10" stroke="#f97316" strokeWidth="1" opacity="0.7" />
      <path d="M32 6 L32 58 M6 32 L58 32" stroke="#c026d3" strokeWidth="0.8" opacity="0.5" />
      <path
        d="M32 14 L42 38 L32 50 L22 38 Z"
        fill="#a855f7"
        fillOpacity="0.35"
        stroke="#c026d3"
        strokeWidth="1"
      />
      <circle cx="32" cy="32" r="3.5" fill="#fbbf24" />
      <path
        d="M32 22 L35 30 L32 34 L29 30 Z"
        fill="#fbbf24"
        opacity="0.9"
      />
    </svg>
  )
}
