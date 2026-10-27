import { seedLeads, staff, type Lead, type LeadStatus } from "./data";

// In-memory lead store (resets when the server restarts). Swap for a database later.
const g = globalThis as unknown as { __bnbLeads?: Lead[] };
const leads: Lead[] = (g.__bnbLeads ??= [...seedLeads]);

export function getLeads() {
  return leads;
}

let rr = 0;
const salesTeam = staff.filter((s) => s.role === "Sales Executive").map((s) => s.name);

export function addLead(input: { name: string; phone: string; city: string; type: string; bill: string }) {
  const nextId = Math.max(...leads.map((l) => Number(l.id.slice(1)))) + 1;
  const today = new Date().toISOString().slice(0, 10);
  const lead: Lead = {
    id: `L${nextId}`,
    ...input,
    kw: 0,
    source: "Website",
    status: "New",
    // Round-robin auto-assignment across the sales team.
    assignedTo: salesTeam[rr++ % salesTeam.length],
    createdAt: today,
    nextFollowUp: today,
    notes: "",
  };
  leads.unshift(lead);
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus) {
  const lead = leads.find((l) => l.id === id);
  if (lead) lead.status = status;
  return lead;
}
