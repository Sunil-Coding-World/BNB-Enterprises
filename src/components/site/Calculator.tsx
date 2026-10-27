"use client";

import { useState } from "react";
import { inr } from "@/lib/format";

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
    <div className="calc fade">
      <div className="calc-in">
        <label htmlFor="bill">Monthly electricity bill</label>
        <div className="bill-val">₹{bill.toLocaleString("en-IN")}</div>
        <input id="bill" type="range" min={500} max={30000} step={250} value={bill} onChange={(e) => setBill(+e.target.value)} />
        <label>Property type</label>
        <div className="seg">
          <button className={type === "home" ? "on" : ""} onClick={() => setType("home")}>
            🏠 Home
          </button>
          <button className={type === "biz" ? "on" : ""} onClick={() => setType("biz")}>
            🏢 Business
          </button>
        </div>
      </div>
      <div className="calc-out">
        <div className="out-grid">
          <div className="big">
            <span>Yearly savings (approx.)</span>
            <b>{inr(save)}</b>
          </div>
          <div>
            <span>Recommended system</span>
            <b>{kw} kW</b>
          </div>
          <div>
            <span>Subsidy (central + CG)</span>
            <b className="sun-text">{subsidy ? inr(subsidy) : "N/A*"}</b>
          </div>
          <div>
            <span>Est. cost after subsidy</span>
            <b>{inr(net)}</b>
          </div>
          <div>
            <span>Payback period</span>
            <b>{(net / save).toFixed(1)} yrs</b>
          </div>
        </div>
        <small>
          *Estimate only. CSPDCL ka ~₹{TARIFF}/unit tariff aur {UNITS_PER_KW} units/kW/month generation maan ke. State subsidy ki rakam CSPDCL
          ke latest notification par depend karti hai. Commercial par subsidy nahi hai, par accelerated depreciation ka tax benefit milta hai.
          Exact quote site survey ke baad.
        </small>
      </div>
    </div>
  );
}
