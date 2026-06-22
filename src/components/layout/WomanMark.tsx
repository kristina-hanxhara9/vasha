/** VASHA mark — a warm, traditional Albanian woman (gold-coin headband),
 *  with a gentle sway animation. Self-contained inline SVG. */
export function WomanMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="vasha-woman">
        {/* shoulders / dress */}
        <path d="M5 31 C5 25.5 9.7 23 16 23 C22.3 23 27 25.5 27 31 Z" fill="#6B3A5B" />
        {/* hair / scarf */}
        <path
          d="M16 4 C10 4 7.5 8.5 7.5 14 C7.5 19.5 11 23 16 23 C21 23 24.5 19.5 24.5 14 C24.5 8.5 22 4 16 4 Z"
          fill="#47263A"
        />
        {/* face */}
        <ellipse cx="16" cy="14.5" rx="5.7" ry="6.7" fill="#F3E2EC" />
        {/* traditional headband + gold coins */}
        <path d="M9.6 10.6 Q16 6 22.4 10.6" stroke="#6B3A5B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="12.3" cy="9.4" r="1" fill="#D6A148" />
        <circle cx="16" cy="8.1" r="1.15" fill="#E5BC6E" />
        <circle cx="19.7" cy="9.4" r="1" fill="#D6A148" />
        {/* eyes + smile */}
        <circle cx="13.8" cy="14.8" r="0.85" fill="#47263A" />
        <circle cx="18.2" cy="14.8" r="0.85" fill="#47263A" />
        <path d="M13.6 18.1 Q16 20 18.4 18.1" stroke="#47263A" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        {/* gold earrings */}
        <circle cx="10.5" cy="17" r="0.8" fill="#D6A148" />
        <circle cx="21.5" cy="17" r="0.8" fill="#D6A148" />
      </g>
    </svg>
  );
}
