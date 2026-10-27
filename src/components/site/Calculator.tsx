"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { inr } from "@/lib/format";
import { fadeUp, inView } from "@/lib/motion";
import { cx } from "@/lib/styles";
import { AnimatedNumber } from "./Effects";

const TARIFF = 6; // ₹ per unit, approx. CSPDCL domestic average
const UNITS_PER_KW = 125; // monthly generation per kW (Chhattisgarh gets good sun)
const COST_PER_KW = { home: 60000, biz: 46000 };

// PM Surya Ghar (central): ₹30,000/kW for first 2 kW, capped at ₹78,000 for 3 kW+.
// Chhattisgarh state top-up: ₹15,000 for 1 kW, ₹30,000 for 2 kW+ (confirm latest CSPDCL notification).
function residentialSubsidy(kw: number) {
  const central = kw <= 2 ? 30000 * kw : 78000;
  const state = kw < 2 ? 15000 : 30000;
  return central + state;
}

const TYPES = [
  { id: "home", label: "🏠 Home" },
  { id: "biz", label: "🏢 Business" },
] as const;

const kwText = (n: number) => `${(Math.round(n * 2) / 2).toString()} kW`;
const yrsText = (n: number) => `${n.toFixed(1)} yrs`;

function Out({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <span className="block text-[.85rem] opacity-65">{label}</span>
      <b className="font-display text-[2rem]">{children}</b>
    </div>
  );
}

export default function Calculator() {
  const [bill, setBill] = useState(3000);
  const [type, setType] = useState<"home" | "biz">("home");

  const units = bill / TARIFF;
  const kw = Math.max(1, Math.ceil((units / UNITS_PER_KW) * 2) / 2);
  const cost = kw * COST_PER_KW[type];
  const subsidy = type === "home" ? residentialSubsidy(kw) : 0;
  const net = cost - subsidy;
  const save = Math.min(units, kw * UNITS_PER_KW) * TARIFF * 12;

  return (
    <motion.div
      {...inView}
      variants={fadeUp}
      className="grid overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(11,26,46,.35)] lg:grid-cols-2"
    >
      <div className="rounded-t-[28px] border border-b-0 border-line bg-white p-[26px] sm:p-11 lg:rounded-l-[28px] lg:rounded-tr-none lg:border-r-0 lg:border-b">
        <label htmlFor="bill" className="mb-2 block font-semibold">
          Monthly electricity bill
        </label>
        <div className="font-display text-5xl font-extrabold text-sun-text">
          <AnimatedNumber value={bill} format={inr} />
        </div>
        <input
          id="bill"
          type="range"
          min={500}
          max={30000}
          step={250}
          value={bill}
          onChange={(e) => setBill(+e.target.value)}
          className="mt-2.5 mb-7 w-full accent-sun-deep"
        />
        <span className="mb-2 block font-semibold">Property type</span>
        <div className="mb-2 flex flex-wrap gap-2">
          {TYPES.map((t) => {
            const on = type === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                aria-pressed={on}
                className={cx(
                  "relative min-w-[110px] flex-1 rounded-xl border-[1.5px] p-3 font-semibold transition-colors",
                  on ? "border-leaf text-leaf-deep" : "border-line bg-paper",
                )}
              >
                {on && <motion.span layoutId="calc-type" className="absolute inset-0 rounded-[10px] bg-[#e9f8f0]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden bg-night p-[26px] text-white sm:p-11">
        <motion.div
          aria-hidden="true"
          className="absolute -right-20 -bottom-20 size-60 rounded-full bg-[radial-gradient(circle,rgba(255,178,26,.45),transparent_70%)]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 grid gap-[22px] sm:grid-cols-2">
          <div className="border-b border-white/15 pb-5 sm:col-span-2">
            <span className="block text-[.85rem] opacity-65">Yearly savings (approx.)</span>
            <b className="font-display text-5xl text-leaf">
              <AnimatedNumber value={save} format={inr} />
            </b>
          </div>
          <Out label="Recommended system">
            <AnimatedNumber value={kw} format={kwText} />
          </Out>
          <Out label="Subsidy (central + CG)">
            <span className="text-sun">{subsidy ? <AnimatedNumber value={subsidy} format={inr} /> : "N/A*"}</span>
          </Out>
          <Out label="Est. cost after subsidy">
            <AnimatedNumber value={net} format={inr} />
          </Out>
          <Out label="Payback period">
            <AnimatedNumber value={net / save} format={yrsText} />
          </Out>
        </div>
        <small className="relative z-10 mt-6 block text-[.75rem] opacity-55">
          *Estimate only. CSPDCL ka ~₹{TARIFF}/unit tariff aur {UNITS_PER_KW} units/kW/month generation maan ke. State subsidy ki rakam CSPDCL
          ke latest notification par depend karti hai. Commercial par subsidy nahi hai, par accelerated depreciation ka tax benefit milta hai.
          Exact quote site survey ke baad.
        </small>
      </div>
    </motion.div>
  );
}
