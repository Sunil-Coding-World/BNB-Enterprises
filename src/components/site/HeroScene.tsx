import * as motion from "motion/react-client";

// Animated rooftop-solar illustration for the hero (pure SVG, no images).
// Continuous loops are Tailwind animate-* utilities; one-off entrances use Motion.

const trees = [
  {
    delay: 0.2,
    sway: "4s",
    shape: (
      <>
        <rect x="54" y="300" width="8" height="40" rx="3" fill="#6b4a2b" />
        <circle cx="58" cy="290" r="26" fill="#2fbf71" />
        <circle cx="44" cy="300" r="16" fill="#25a862" />
        <circle cx="72" cy="302" r="15" fill="#3fd384" />
      </>
    ),
  },
  {
    delay: 0.45,
    sway: "5s",
    shape: (
      <>
        <rect x="452" y="292" width="8" height="46" rx="3" fill="#6b4a2b" />
        <path d="M456 230 L486 296 H426 Z" fill="#25a862" />
        <path d="M456 210 L480 262 H432 Z" fill="#3fd384" />
      </>
    ),
  },
  {
    delay: 0.65,
    sway: "3.4s",
    shape: (
      <>
        <rect x="102" y="318" width="6" height="30" rx="3" fill="#6b4a2b" />
        <circle cx="105" cy="312" r="16" fill="#3fd384" />
      </>
    ),
  },
];

const leaves = [
  { x: 70, d: "0s" },
  { x: 150, d: "2.2s" },
  { x: 430, d: "1.1s" },
  { x: 480, d: "3.3s" },
];

export default function HeroScene() {
  return (
    <svg
      className="block h-auto w-full rounded-[28px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6),0_0_0_1px_rgba(255,255,255,.08)] [&_*]:[transform-box:fill-box]"
      viewBox="0 0 520 440"
      role="img"
      aria-label="Ghar ki chhat par solar panel, sooraj ki roshni aur hare ped"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#173a66" />
          <stop offset="1" stopColor="#0f2747" />
        </linearGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2fbf71" />
          <stop offset="1" stopColor="#16955a" />
        </linearGradient>
        <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f8a55" />
          <stop offset="1" stopColor="#14663f" />
        </linearGradient>
        <linearGradient id="pv" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a64ad" />
          <stop offset="1" stopColor="#11315c" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#ffd36b" />
          <stop offset=".45" stopColor="#ffb21a" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffb21a" stopOpacity="0" />
        </radialGradient>
        <clipPath id="frame">
          <rect width="520" height="440" rx="28" />
        </clipPath>
        <clipPath id="panelClip">
          <path d="M150 196 L262 126 L384 196 L272 266 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#frame)">
        <rect width="520" height="440" fill="url(#sky)" />

        {/* Sun */}
        <g transform="translate(420 84)">
          <circle r="110" fill="url(#glow)" className="origin-center animate-glow" />
          <g className="origin-center animate-spin-slow">
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x="-3" y="-72" width="6" height="22" rx="3" fill="#ffc94d" transform={`rotate(${i * 30})`} />
            ))}
          </g>
          <circle r="38" fill="#ffb21a" />
          <circle r="38" fill="none" stroke="#ffd36b" strokeWidth="4" />
        </g>

        {/* Sun beams onto the panel */}
        <g stroke="#ffd36b" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 10" className="[&>path]:animate-beam">
          <path d="M392 112 L320 170" />
          <path d="M404 124 L350 196" />
          <path d="M378 102 L290 150" />
        </g>

        {/* Hills */}
        <path d="M0 330 Q120 270 250 310 T520 290 V440 H0 Z" fill="url(#hillBack)" />
        <path d="M0 360 Q140 320 280 350 T520 340 V440 H0 Z" fill="url(#hill)" />

        {/* Trees: spring up, then sway */}
        {trees.map((t, i) => (
          <motion.g
            key={i}
            style={{ originX: 0.5, originY: 1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 12, delay: t.delay }}
          >
            <g className="origin-bottom animate-sway" style={{ animationDuration: t.sway, animationDelay: `${t.delay + 1}s` }}>
              {t.shape}
            </g>
          </motion.g>
        ))}

        {/* House */}
        <g>
          <path d="M172 250 V352 H372 V250 L272 290 Z" fill="#f4efe3" />
          <path d="M272 290 L372 250 V352 H272 Z" fill="#e2dccd" />
          {/* roof */}
          <path d="M140 200 L262 120 L394 200 L272 274 Z" fill="#7a2e1d" />
          <path d="M140 200 L272 274 L272 286 L134 206 Z" fill="#5c2214" />
          <path d="M272 274 L394 200 L400 206 L272 286 Z" fill="#4a1b10" />
          {/* solar panel array, drops onto the roof */}
          <motion.g initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.5 }}>
            <path d="M150 196 L262 126 L384 196 L272 266 Z" fill="url(#pv)" stroke="#9fb6d3" strokeWidth="2.5" strokeLinejoin="round" />
            <g stroke="#9fb6d3" strokeWidth="1.3" opacity=".9">
              <path d="M178 178.5 L300 248.5" />
              <path d="M206 161 L328 231" />
              <path d="M234 143.5 L356 213.5" />
              <path d="M180.5 213.5 L292.5 143.5" />
              <path d="M211 231 L323 161" />
              <path d="M241.5 248.5 L353.5 178.5" />
            </g>
            <g clipPath="url(#panelClip)">
              <rect className="animate-sweep" x="120" y="110" width="60" height="180" fill="url(#shine)" transform="skewX(-25)" />
            </g>
          </motion.g>
          {/* door & windows */}
          <rect x="300" y="300" width="34" height="52" rx="4" fill="#0f2747" />
          <circle cx="326" cy="328" r="2.5" fill="#ffb21a" />
          <rect x="196" y="292" width="50" height="36" rx="4" fill="#0f2747" />
          <rect className="animate-lit" x="200" y="296" width="42" height="28" rx="2" fill="#ffd36b" />
          <path d="M221 296 V324 M200 310 H242" stroke="#0f2747" strokeWidth="2.5" />
        </g>

        {/* Energy flow: panel -> inverter -> house */}
        <motion.path
          className="animate-flow"
          d="M368 206 C410 230 420 270 404 300"
          fill="none"
          stroke="#ffb21a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        />
        <g transform="translate(386 300)">
          <rect width="36" height="44" rx="6" fill="#ffffff" stroke="#9fb6d3" strokeWidth="1.5" />
          <path d="M20 8 L12 24 H19 L15 36 L26 18 H19 Z" fill="#f07b0e" className="animate-blink" />
        </g>

        {/* Floating leaves */}
        {leaves.map((l, i) => (
          <path
            key={i}
            className="animate-leaf opacity-0"
            style={{ animationDelay: l.d }}
            d={`M${l.x} 330 q10 -14 22 -4 q-8 14 -22 4 Z`}
            fill={i % 2 ? "#7ee2a8" : "#3fd384"}
          />
        ))}
      </g>
    </svg>
  );
}
