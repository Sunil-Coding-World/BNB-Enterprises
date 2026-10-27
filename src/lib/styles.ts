// Shared Tailwind class strings for elements used across the site and admin.

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const BTN_VARIANTS = {
  sun: "bg-sun text-night shadow-[0_8px_24px_-8px_rgba(255,178,26,.7)] hover:-translate-y-0.5 hover:bg-[#ffc240]",
  ghost: "border-[1.5px] border-white/35 text-white hover:bg-white/10",
  plain: "border border-line bg-white text-ink hover:bg-paper",
};

const BTN_SIZES = {
  md: "px-6 py-3",
  sm: "px-4 py-1.5 text-[.85rem]",
};

export function btn(variant: keyof typeof BTN_VARIANTS = "sun", size: keyof typeof BTN_SIZES = "md") {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 disabled:cursor-wait disabled:opacity-70",
    BTN_VARIANTS[variant],
    BTN_SIZES[size],
  );
}

export const eyebrow = "inline-block text-[.8rem] font-semibold uppercase tracking-[.14em] text-leaf-deep";
