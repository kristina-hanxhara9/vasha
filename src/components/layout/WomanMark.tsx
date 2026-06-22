/** VASHA mark — an elegant, simple woman silhouette (hair in a bun with a small
 *  gold pin), with a gentle sway. No facial features — clean and refined. */
export function WomanMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="vasha-woman" fill="#6B3A5B">
        {/* shoulders / bust */}
        <path d="M8.4 30 C8.4 23.2 11.8 20.7 16 20.7 C20.2 20.7 23.6 23.2 23.6 30 Z" />
        {/* neck */}
        <rect x="14.4" y="16.4" width="3.2" height="5" rx="1.5" />
        {/* head */}
        <ellipse cx="16" cy="12" rx="4.6" ry="5.6" />
        {/* hair bun */}
        <circle cx="16" cy="5.6" r="2.5" />
      </g>
      {/* small gold hair pin */}
      <circle cx="16" cy="5.6" r="0.95" fill="#D6A148" />
    </svg>
  );
}
