"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type FormEvent } from "react";
import { DISTRICTS, LEAD_SOURCES, LEAD_STATUSES, TODAY, type Lead, type LeadStatus } from "@/lib/data";
import { shortDate } from "@/lib/format";
import { btn, cx } from "@/lib/styles";
import { LeadPill, muted, table, td, th } from "./ui";

const control = "rounded-xl border border-line bg-white px-3 py-2.5";
const actionLink = "ml-1 inline-grid size-8 place-items-center rounded-[10px] border border-line transition hover:scale-110 hover:bg-paper";
// Compact chevron-only select next to the status pill
const statusSelect = "select-chevron w-7 cursor-pointer appearance-none rounded-lg border border-line px-1.5 py-1 text-[.8rem] text-transparent [&_option]:text-ink";

export default function LeadsTable({ initial, team }: { initial: Lead[]; team: string[] }) {
  const [leads, setLeads] = useState(initial);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<LeadStatus | "All">("All");
  const [source, setSource] = useState("All");
  const [owner, setOwner] = useState("All");
  const [district, setDistrict] = useState("All");
  const [adding, setAdding] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: leads.length };
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const rows = leads.filter(
    (l) =>
      (status === "All" || l.status === status) &&
      (source === "All" || l.source === source) &&
      (owner === "All" || l.assignedTo === owner) &&
      (district === "All" || l.city === district) &&
      (!q || `${l.name} ${l.phone} ${l.city} ${l.id}`.toLowerCase().includes(q.toLowerCase())),
  );

  async function changeStatus(id: string, next: LeadStatus) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status: next } : l)));
    await fetch("/api/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: next }) });
  }

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-1.5" role="tablist">
        {(["All", ...LEAD_STATUSES] as const).map((s) => {
          const on = status === s;
          return (
            <button
              key={s}
              role="tab"
              aria-selected={on}
              onClick={() => setStatus(s)}
              className={cx(
                "relative rounded-full border px-3.5 py-[7px] text-[.88rem] font-medium transition-colors",
                on ? "border-night text-white" : "border-line bg-white hover:border-muted",
              )}
            >
              {on && <motion.span layoutId="lead-tab" className="absolute inset-0 rounded-full bg-night" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative">
                {s} <span className={cx("ml-1 text-[.8rem]", on ? "text-sun" : "text-muted")}>{counts[s] ?? 0}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-3 flex flex-wrap gap-2.5">
        <input className={cx(control, "min-w-[200px] flex-1")} placeholder="Search name, phone, city…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className={control} value={source} onChange={(e) => setSource(e.target.value)} aria-label="Source">
          <option value="All">All sources</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select className={control} value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="District">
          <option value="All">All zile</option>
          {DISTRICTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select className={control} value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Assigned to">
          <option value="All">All staff</option>
          {team.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={btn("sun")} onClick={() => setAdding(true)}>
          + New Lead
        </motion.button>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-[18px] border border-line bg-white py-1">
        <table className={table}>
          <thead>
            <tr>
              <th className={th}>Lead</th>
              <th className={th}>Zila / Type</th>
              <th className={th}>Bill · Size</th>
              <th className={th}>Source</th>
              <th className={th}>Assigned</th>
              <th className={th}>Follow-up</th>
              <th className={th}>Status</th>
              <th className={th} />
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((l) => {
                const overdue = l.nextFollowUp && l.nextFollowUp < TODAY && l.status !== "Won" && l.status !== "Lost";
                const digits = l.phone.replace(/\D/g, "");
                return (
                  <motion.tr
                    key={l.id}
                    layout="position"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className={td}>
                      <b>{l.name}</b>
                      <small>
                        {l.id} · {l.phone}
                      </small>
                    </td>
                    <td className={td}>
                      {l.city}
                      <small>{l.type}</small>
                    </td>
                    <td className={td}>
                      {l.bill || "—"}
                      <small>{l.kw ? `${l.kw} kW` : "Size TBD"}</small>
                    </td>
                    <td className={td}>{l.source}</td>
                    <td className={td}>{l.assignedTo}</td>
                    <td className={cx(td, overdue && "text-bad")}>
                      {l.nextFollowUp ? shortDate(l.nextFollowUp) : "—"}
                      {overdue && <small className="text-bad!">Overdue</small>}
                    </td>
                    <td className={td}>
                      <div className="flex items-center gap-2">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span key={l.status} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
                            <LeadPill status={l.status} />
                          </motion.span>
                        </AnimatePresence>
                        <select
                          className={statusSelect}
                          aria-label={`Change status for ${l.name}`}
                          value={l.status}
                          onChange={(e) => changeStatus(l.id, e.target.value as LeadStatus)}
                        >
                          {LEAD_STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className={cx(td, "whitespace-nowrap")}>
                      <a className={actionLink} href={`tel:+91${digits}`} title="Call">
                        📞
                      </a>
                      <a className={actionLink} href={`https://wa.me/91${digits}`} target="_blank" rel="noopener" title="WhatsApp">
                        💬
                      </a>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
            {!rows.length && (
              <tr>
                <td colSpan={8} className={cx(td, muted, "p-[30px] text-center")}>
                  Koi lead nahi mili
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>{adding && <AddLead onClose={() => setAdding(false)} onAdded={(l) => setLeads((ls) => [l, ...ls])} />}</AnimatePresence>
    </>
  );
}

function AddLead({ onClose, onAdded }: { onClose: () => void; onAdded: (l: Lead) => void }) {
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    onAdded(data.lead);
    onClose();
  }

  const field = "grid gap-1 text-[.85rem] font-semibold";

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-night/55 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        className="grid w-[min(420px,100%)] gap-3 rounded-[20px] bg-white p-[26px]"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <h2 className="text-xl">New lead</h2>
        <label className={field}>
          Name
          <input name="name" required className={cx(control, "font-normal")} />
        </label>
        <label className={field}>
          Mobile
          <input name="phone" required inputMode="numeric" maxLength={10} placeholder="10 digits" className={cx(control, "font-normal")} />
        </label>
        <label className={field}>
          Zila (District)
          <select name="city" defaultValue="Raipur" className={cx(control, "font-normal")}>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className={field}>
          Property type
          <select name="type" className={cx(control, "font-normal")}>
            <option>Home</option>
            <option>Shop / Office</option>
            <option>Factory / Industry</option>
            <option>School / Hospital</option>
            <option>Housing Society</option>
          </select>
        </label>
        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-bad" role="alert">
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="mt-1.5 flex justify-end gap-2.5">
          <button type="button" className={btn("plain")} onClick={onClose}>
            Cancel
          </button>
          <button className={btn("sun")}>Save lead</button>
        </div>
      </motion.form>
    </motion.div>
  );
}
