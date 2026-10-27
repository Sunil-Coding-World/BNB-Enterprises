"use client";

import { useMemo, useState, type FormEvent } from "react";
import { DISTRICTS, LEAD_SOURCES, LEAD_STATUSES, TODAY, type Lead, type LeadStatus } from "@/lib/data";
import { shortDate } from "@/lib/format";
import { LeadPill } from "./ui";

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
      <div className="tabs" role="tablist">
        {(["All", ...LEAD_STATUSES] as const).map((s) => (
          <button key={s} role="tab" aria-selected={status === s} className={status === s ? "on" : ""} onClick={() => setStatus(s)}>
            {s} <span>{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="toolbar">
        <input className="search" placeholder="Search name, phone, city…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={source} onChange={(e) => setSource(e.target.value)} aria-label="Source">
          <option value="All">All sources</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="District">
          <option value="All">All zile</option>
          {DISTRICTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Assigned to">
          <option value="All">All staff</option>
          {team.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button className="btn btn-sun" onClick={() => setAdding(true)}>
          + New Lead
        </button>
      </div>

      <div className="panel table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Zila / Type</th>
              <th>Bill · Size</th>
              <th>Source</th>
              <th>Assigned</th>
              <th>Follow-up</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => {
              const overdue = l.nextFollowUp && l.nextFollowUp < TODAY && l.status !== "Won" && l.status !== "Lost";
              const digits = l.phone.replace(/\D/g, "");
              return (
                <tr key={l.id}>
                  <td>
                    <b>{l.name}</b>
                    <small>
                      {l.id} · {l.phone}
                    </small>
                  </td>
                  <td>
                    {l.city}
                    <small>{l.type}</small>
                  </td>
                  <td>
                    {l.bill || "—"}
                    <small>{l.kw ? `${l.kw} kW` : "Size TBD"}</small>
                  </td>
                  <td>{l.source}</td>
                  <td>{l.assignedTo}</td>
                  <td className={overdue ? "t-bad" : ""}>
                    {l.nextFollowUp ? shortDate(l.nextFollowUp) : "—"}
                    {overdue && <small className="t-bad">Overdue</small>}
                  </td>
                  <td>
                    <div className="status-cell">
                      <LeadPill status={l.status} />
                      <select aria-label={`Change status for ${l.name}`} value={l.status} onChange={(e) => changeStatus(l.id, e.target.value as LeadStatus)}>
                        {LEAD_STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="actions">
                    <a href={`tel:+91${digits}`} title="Call">📞</a>
                    <a href={`https://wa.me/91${digits}`} target="_blank" rel="noopener" title="WhatsApp">💬</a>
                  </td>
                </tr>
              );
            })}
            {!rows.length && (
              <tr>
                <td colSpan={8} className="muted center">
                  Koi lead nahi mili
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {adding && <AddLead onClose={() => setAdding(false)} onAdded={(l) => setLeads((ls) => [l, ...ls])} />}
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

  return (
    <div className="modal-bg" onClick={onClose}>
      <form className="modal" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <h2>New lead</h2>
        <label>
          Name<input name="name" required />
        </label>
        <label>
          Mobile<input name="phone" required inputMode="numeric" maxLength={10} placeholder="10 digits" />
        </label>
        <label>
          Zila (District)
          <select name="city" defaultValue="Raipur">
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Property type
          <select name="type">
            <option>Home</option>
            <option>Shop / Office</option>
            <option>Factory / Industry</option>
            <option>School / Hospital</option>
            <option>Housing Society</option>
          </select>
        </label>
        {error && <p className="t-bad">{error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-plain" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-sun">Save lead</button>
        </div>
      </form>
    </div>
  );
}
