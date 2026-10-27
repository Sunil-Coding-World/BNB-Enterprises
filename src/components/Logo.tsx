const SIZES = { lg: "text-[1.3rem]", md: "text-[1.1rem]", sm: "text-base" };

export default function Logo({ tagline = true, size = "lg" }: { tagline?: boolean; size?: keyof typeof SIZES }) {
  return (
    <span className={`flex items-center gap-2.5 font-display leading-tight font-extrabold ${SIZES[size]}`}>
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="size-9 flex-none">
        <circle cx="28" cy="11" r="7" fill="#ffb21a" />
        <path d="M4 34 L14 18 H36 L26 34 Z" fill="#1f5fa8" stroke="#9fb6d3" strokeWidth="1.5" />
        <path d="M9 26 H31 M19.5 18 L15 34 M27.5 18 L21 34" stroke="#9fb6d3" strokeWidth="1.2" />
        <path d="M6 37 C12 33 18 37 24 34" stroke="#2fbf71" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span>
        BNB Enterprises
        {tagline && <small className="block font-sans text-[.7rem] font-medium tracking-[.18em] opacity-70">SOLAR SOLUTIONS</small>}
      </span>
    </span>
  );
}
