import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import {
  AttendancePill,
  BarChart,
  Card,
  Empty,
  grid2,
  grid21,
  grid3,
  HBars,
  Kpi,
  Kpis,
  LeadPill,
  link,
  List,
  Loading,
  muted,
  num,
  PageHead,
  Pill,
  Row,
  stack,
} from "@/components/admin/ui";
import { daysBetween, LEAD_SOURCES, LEAD_STATUSES, monthlyRevenue, PROJECT_STAGES, projects, staff, TODAY } from "@/lib/data";
import { inr, inrShort, shortDate } from "@/lib/format";
import { getLeads } from "@/lib/store";
import { btn } from "@/lib/styles";

export default function Dashboard() {
  return (
    <>
      <PageHead title="Namaste, Owner 👋" sub={`Business overview · ${shortDate(TODAY)} ${TODAY.slice(0, 4)}`}>
        <Link href="/admin/leads" className={btn("sun")}>
          + Add Lead
        </Link>
      </PageHead>
      <Suspense fallback={<Loading>Loading dashboard…</Loading>}>
        <DashboardData />
      </Suspense>
    </>
  );
}

async function DashboardData() {
  await connection(); // leads change at runtime (website form)
  const leads = getLeads();
  const month = TODAY.slice(0, 7);
  const monthLeads = leads.filter((l) => l.createdAt.startsWith(month));
  const won = monthLeads.filter((l) => l.status === "Won").length;
  const closed = monthLeads.filter((l) => l.status === "Won" || l.status === "Lost").length;

  const pendingPayment = projects.reduce((s, p) => s + (p.value - p.paid), 0);
  const subsidyPending = projects.filter((p) => p.subsidy > 0 && p.stage < PROJECT_STAGES.length - 1);
  const [prev, curr] = monthlyRevenue.slice(-2);
  const growth = Math.round(((curr.revenue - prev.revenue) / prev.revenue) * 100);

  const followUps = leads
    .filter((l) => l.nextFollowUp && l.nextFollowUp <= TODAY && l.status !== "Won" && l.status !== "Lost")
    .sort((a, b) => a.nextFollowUp!.localeCompare(b.nextFollowUp!));

  const stuck = projects
    .filter((p) => p.stage < PROJECT_STAGES.length - 1 && daysBetween(p.stageSince) > 14)
    .sort((a, b) => daysBetween(b.stageSince) - daysBetween(a.stageSince));

  const funnel = LEAD_STATUSES.filter((s) => s !== "Lost").map((s) => ({
    label: s,
    value: leads.filter((l) => l.status === s).length,
  }));
  const sources = LEAD_SOURCES.map((s) => ({ label: s, value: leads.filter((l) => l.source === s).length })).sort((a, b) => b.value - a.value);
  const districtCounts = leads.reduce<Record<string, number>>((acc, l) => ((acc[l.city] = (acc[l.city] ?? 0) + 1), acc), {});
  const districts = Object.entries(districtCounts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const present = staff.filter((s) => s.attendance === "Present" || s.attendance === "On Field").length;

  return (
    <>
      <Kpis>
        <Kpi label="Leads this month" value={String(monthLeads.length)} hint={`${leads.filter((l) => l.status === "New").length} new, uncontacted`} tone="info" />
        <Kpi label="Conversion (closed)" value={closed ? `${Math.round((won / closed) * 100)}%` : "—"} hint={`${won} won of ${closed} closed`} />
        <Kpi label="Revenue · Oct" value={inrShort(curr.revenue)} hint={`${growth >= 0 ? "▲" : "▼"} ${Math.abs(growth)}% vs Sep`} tone={growth >= 0 ? "good" : "bad"} />
        <Kpi label="Payment pending" value={inrShort(pendingPayment)} hint={`${projects.filter((p) => p.paid < p.value).length} customers`} tone="warn" />
        <Kpi
          label="Subsidy pending"
          value={String(subsidyPending.length)}
          hint={`${inrShort(subsidyPending.reduce((s, p) => s + p.subsidy + p.stateSubsidy, 0))} central + CG`}
          tone="warn"
        />
      </Kpis>

      <div className={grid21}>
        <Card title="Monthly revenue" action={<span className={muted}>Last 6 months</span>}>
          <BarChart
            label="Monthly revenue, last 6 months"
            data={monthlyRevenue.map((m) => ({ label: m.month, value: m.revenue, tip: `${m.installs} installations` }))}
            format={inrShort}
          />
        </Card>
        <Card title="Lead pipeline" action={<Link href="/admin/leads" className={link}>All leads →</Link>}>
          <HBars data={funnel} />
        </Card>
      </div>

      <div className={grid3}>
        <Card title="Aaj ke follow-ups" action={<Pill tone={followUps.length ? "warn" : "good"}>{followUps.length} due</Pill>}>
          <List>
            {followUps.slice(0, 6).map((l) => {
              const overdue = daysBetween(l.nextFollowUp!);
              return (
                <Row key={l.id} title={l.name} sub={`${l.phone} · ${l.assignedTo}`}>
                  <LeadPill status={l.status} />
                  <small className={overdue > 0 ? "text-bad" : "text-muted"}>{overdue > 0 ? `${overdue}d overdue` : "Today"}</small>
                </Row>
              );
            })}
            {!followUps.length && <Empty>Sab follow-ups ho gaye 🎉</Empty>}
          </List>
        </Card>

        <Card title="Projects atke hue (14+ din)" action={<Link href="/admin/projects" className={link}>Tracker →</Link>}>
          <List>
            {stuck.map((p) => (
              <Row key={p.id} title={p.customer} sub={`${p.kw} kW · ${PROJECT_STAGES[p.stage]}`}>
                <Pill tone="bad">{daysBetween(p.stageSince)} days</Pill>
              </Row>
            ))}
            {!stuck.length && <Empty>Koi project atka nahi hai</Empty>}
          </List>
        </Card>

        <Card title="Staff today" action={<span className={muted}>{present}/{staff.length} working</span>}>
          <List>
            {staff.map((s) => (
              <Row key={s.id} title={s.name} sub={s.role}>
                <AttendancePill value={s.attendance} />
              </Row>
            ))}
          </List>
        </Card>
      </div>

      <div className={grid2}>
        <div className={stack}>
          <Card title="Leads by zila" action={<span className={muted}>Top 8 districts</span>}>
            <HBars data={districts} total={leads.length} />
          </Card>
          <Card title="Lead sources" action={<span className={muted}>Kahan se leads aa rahi hain</span>}>
            <HBars data={sources} total={leads.length} />
          </Card>
        </div>
        <Card title="Payment pending" action={<Link href="/admin/accounts" className={link}>Accounts →</Link>}>
          <List>
            {projects
              .filter((p) => p.paid < p.value)
              .sort((a, b) => b.value - b.paid - (a.value - a.paid))
              .map((p) => (
                <Row key={p.id} title={p.customer} sub={`${p.id} · ${PROJECT_STAGES[p.stage]}`}>
                  <b className={num}>{inr(p.value - p.paid)}</b>
                  <small className="text-muted">of {inrShort(p.value)}</small>
                </Row>
              ))}
          </List>
        </Card>
      </div>
    </>
  );
}
