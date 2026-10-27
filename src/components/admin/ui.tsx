import * as motion from "motion/react-client";
import type { ReactNode } from "react";
import type { Attendance, LeadStatus } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { cx } from "@/lib/styles";

export type Tone = "good" | "warn" | "bad" | "info" | "neutral";

const leadTone: Record<LeadStatus, Tone> = {
  New: "info",
  Contacted: "neutral",
  "Survey Scheduled": "warn",
  "Quotation Sent": "warn",
  Negotiation: "warn",
  Won: "good",
  Lost: "bad",
};

const attendanceTone: Record<Attendance, Tone> = {
  Present: "good",
  "On Field": "info",
  Absent: "bad",
  Leave: "neutral",
};

export const toneText: Record<Tone, string> = {
  good: "text-good",
  warn: "text-warn",
  bad: "text-bad",
  info: "text-info",
  neutral: "text-neutral",
};

const pillTone: Record<Tone, string> = {
  good: "bg-good-bg text-good",
  warn: "bg-warn-bg text-warn",
  bad: "bg-bad-bg text-bad",
  info: "bg-info-bg text-info",
  neutral: "bg-neutral-bg text-neutral",
};

// Shared table styles (tables live in several pages)
export const table =
  "w-full border-collapse text-[.9rem] [&_td_small]:block [&_td_small]:text-[.78rem] [&_td_small]:text-muted [&_tbody_tr:hover]:bg-[#fdfbf5] [&_tr:last-child_td]:border-b-0";
export const th = "border-b border-line px-3.5 py-3 text-left text-[.76rem] font-semibold tracking-[.06em] whitespace-nowrap text-muted uppercase";
export const td = "border-b border-line-soft px-3.5 py-3 align-middle";
export const num = "text-right tabular-nums";

export const muted = "text-[.88rem] text-muted";
export const link = "text-[.88rem] font-semibold text-sun-text hover:underline";

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[.78rem] font-semibold whitespace-nowrap before:size-1.5 before:rounded-full before:bg-current",
        pillTone[tone],
      )}
    >
      {children}
    </span>
  );
}

export function LeadPill({ status }: { status: LeadStatus }) {
  return <Pill tone={leadTone[status]}>{status}</Pill>;
}

export function AttendancePill({ value }: { value: Attendance }) {
  return <Pill tone={attendanceTone[value]}>{value}</Pill>;
}

export function PageHead({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-[1.9rem]">{title}</h1>
        {sub && <p className="mt-1.5 text-muted">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function Loading({ children }: { children: ReactNode }) {
  return <div className="animate-pulse p-10 text-muted">{children}</div>;
}

export function Kpis({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger(0.07)} className="mb-[18px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
      {children}
    </motion.div>
  );
}

export function Kpi({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: Tone }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-line bg-white px-[18px] py-4 transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(11,26,46,.35)]"
    >
      <span className="text-[.85rem] font-medium text-muted">{label}</span>
      <b className="mt-1 mb-0.5 block font-display text-[1.85rem] leading-tight tracking-[-.02em]">{value}</b>
      {hint && <small className={cx("text-[.8rem]", tone ? toneText[tone] : "text-muted")}>{hint}</small>}
    </motion.div>
  );
}

export function Card({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className={cx("min-w-0 rounded-[18px] border border-line bg-white px-5 py-[18px]", className)}
    >
      {(title || action) && (
        <header className="mb-3.5 flex items-center justify-between gap-2.5">
          {title && <h2 className="text-[1.1rem]">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </motion.section>
  );
}

// Layout grids
export const grid21 = "mb-4 grid gap-4 xl:grid-cols-[2fr_1fr]";
export const grid3 = "mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3";
export const grid2 = "mt-4 mb-4 grid gap-4 md:grid-cols-2";
export const stack = "grid content-start gap-4";

// Row list: title + subtitle on the left, anything on the right.
export function List({ children }: { children: ReactNode }) {
  return <ul className="grid">{children}</ul>;
}

export function Row({ title, sub, children, className }: { title: ReactNode; sub?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <li className={cx("flex items-center justify-between gap-3 border-t border-line-soft py-2.5 first:border-t-0", className)}>
      <div>
        <b>{title}</b>
        {sub && <small className="block text-[.8rem] text-muted">{sub}</small>}
      </div>
      {children !== undefined && <div className="grid justify-items-end gap-0.5 text-right [&_small]:text-[.8rem]">{children}</div>}
    </li>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <li className={cx(muted, "py-2.5")}>{children}</li>;
}

// Single-series vertical bar chart with hover tooltips and a table fallback.
export function BarChart({
  data,
  format,
  label,
}: {
  data: { label: string; value: number; tip?: string }[];
  format: (n: number) => string;
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  const last = data.length - 1;
  return (
    <figure aria-label={label}>
      <div className="relative flex h-[220px] items-end gap-0.5 border-b border-[#d9d2c0] pt-[22px] pl-[54px]">
        {[1, 0.5].map((g) => (
          <div key={g} className="absolute right-0 left-[54px] border-t border-dashed border-[#ece6d6]" style={{ bottom: `${g * 100}%` }}>
            <span className="absolute -top-[9px] -left-[54px] w-12 text-right text-[.72rem] text-muted">{format(max * g)}</span>
          </div>
        ))}
        {data.map((d, i) => (
          <div key={d.label} tabIndex={0} className="group relative flex h-full flex-1 flex-col items-center justify-end outline-none">
            {i === last && (
              <motion.em
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-5 text-[.78rem] font-semibold text-ink not-italic group-hover:invisible group-focus:invisible"
              >
                {format(d.value)}
              </motion.em>
            )}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.08 }}
              className={cx(
                "w-[min(44px,70%)] origin-bottom rounded-t transition-colors group-hover:bg-sun-text group-focus:bg-sun-text",
                i === last ? "bg-sun-deep" : "bg-[#ffd78a]",
              )}
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 translate-y-1 rounded-[10px] bg-night px-3 py-2 text-[.8rem] whitespace-nowrap text-white opacity-0 transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
              <b className="block">{d.label}</b>
              {format(d.value)}
              {d.tip && <small className="block opacity-70">{d.tip}</small>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-0.5 pl-[54px]">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-[.78rem] text-muted">
            {d.label}
          </span>
        ))}
      </div>
      <details className="mt-2.5 text-[.82rem]">
        <summary className="cursor-pointer text-muted">View as table</summary>
        <table className="mt-1.5 w-full border-collapse">
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="[&_td]:border-t [&_td]:border-line-soft [&_td]:py-1">
                <td>{d.label}</td>
                <td>{format(d.value)}</td>
                {d.tip && <td>{d.tip}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

// Horizontal bars, e.g. a funnel or a source breakdown.
export function HBars({ data, total }: { data: { label: string; value: number }[]; total?: number }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="grid gap-2.5">
      {data.map((d, i) => (
        <li key={d.label} title={`${d.label}: ${d.value}`} className="group grid grid-cols-[118px_1fr_56px] items-center gap-2.5 text-[.86rem]">
          <span className="truncate text-ink">{d.label}</span>
          <span className="h-3 rounded-r bg-track">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.06 }}
              className="block h-full min-w-0.5 origin-left rounded-r bg-leaf-deep transition-colors group-hover:bg-[#0f7445]"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </span>
          <span className="text-right font-semibold tabular-nums">
            {d.value}
            {total ? <small className="font-normal text-muted"> · {Math.round((d.value / total) * 100)}%</small> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Thin progress bar that fills from the left.
export function Meter({ pct, delay = 0, className }: { pct: number; delay?: number; className?: string }) {
  return (
    <div className={cx("h-2.5 rounded-r bg-track", className)} title={`${pct}%`}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
        className="block h-full origin-left rounded-r bg-leaf-deep"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
