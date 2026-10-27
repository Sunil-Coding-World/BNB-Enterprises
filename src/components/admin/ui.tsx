import type { ReactNode } from "react";
import type { Attendance, LeadStatus } from "@/lib/data";

type Tone = "good" | "warn" | "bad" | "info" | "neutral";

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

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

export function LeadPill({ status }: { status: LeadStatus }) {
  return <Pill tone={leadTone[status]}>{status}</Pill>;
}

export function AttendancePill({ value }: { value: Attendance }) {
  return <Pill tone={attendanceTone[value]}>{value}</Pill>;
}

export function PageHead({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function Kpi({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: Tone }) {
  return (
    <div className="kpi">
      <span>{label}</span>
      <b>{value}</b>
      {hint && <small className={tone ? `t-${tone}` : ""}>{hint}</small>}
    </div>
  );
}

export function Card({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`panel ${className}`}>
      {(title || action) && (
        <header>
          {title && <h2>{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
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
    <figure className="bars" aria-label={label}>
      <div className="bars-plot">
        {[1, 0.5].map((g) => (
          <div key={g} className="bars-grid" style={{ bottom: `${g * 100}%` }}>
            <span>{format(max * g)}</span>
          </div>
        ))}
        {data.map((d, i) => (
          <div key={d.label} className="bar-col" tabIndex={0}>
            {i === last && <em className="bar-label">{format(d.value)}</em>}
            <div className={`bar${i === last ? " current" : ""}`} style={{ height: `${(d.value / max) * 100}%` }} />
            <div className="tip">
              <b>{d.label}</b>
              {format(d.value)}
              {d.tip && <small>{d.tip}</small>}
            </div>
          </div>
        ))}
      </div>
      <div className="bars-x">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
      <details className="as-table">
        <summary>View as table</summary>
        <table>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
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
    <ul className="hbars">
      {data.map((d) => (
        <li key={d.label} title={`${d.label}: ${d.value}`}>
          <span className="hb-label">{d.label}</span>
          <span className="hb-track">
            <span className="hb-fill" style={{ width: `${(d.value / max) * 100}%` }} />
          </span>
          <span className="hb-val">
            {d.value}
            {total ? <small> · {Math.round((d.value / total) * 100)}%</small> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
