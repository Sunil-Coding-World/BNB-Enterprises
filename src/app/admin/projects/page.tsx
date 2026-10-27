import { Card, HBars, Kpi, PageHead, Pill } from "@/components/admin/ui";
import { daysBetween, PROJECT_STAGES, projects } from "@/lib/data";
import { inr, inrShort, shortDate } from "@/lib/format";

export const metadata = { title: "Projects & Subsidy" };

const LAST = PROJECT_STAGES.length - 1;

export default function ProjectsPage() {
  const active = projects.filter((p) => p.stage < LAST);
  const subsidyDue = projects.filter((p) => p.subsidy > 0 && p.stage < LAST);
  const byStage = PROJECT_STAGES.map((s, i) => ({ label: s, value: projects.filter((p) => p.stage === i).length }));

  return (
    <>
      <PageHead title="Projects & Subsidy Tracker" sub="Booking se lekar PM Surya Ghar subsidy credit hone tak har project ka status." />

      <div className="kpis">
        <Kpi label="Active projects" value={String(active.length)} hint={`${projects.length - active.length} completed`} />
        <Kpi label="Capacity in pipeline" value={`${active.reduce((s, p) => s + p.kw, 0)} kW`} />
        <Kpi
          label="Subsidy awaited"
          value={inrShort(subsidyDue.reduce((s, p) => s + p.subsidy + p.stateSubsidy, 0))}
          hint={`${subsidyDue.length} customers · central + CG`}
          tone="warn"
        />
        <Kpi
          label="Stuck 14+ days"
          value={String(active.filter((p) => daysBetween(p.stageSince) > 14).length)}
          hint="CSPDCL se follow-up karo"
          tone="bad"
        />
      </div>

      <div className="grid-2-1">
        <Card title="All projects">
          <div className="project-list">
            {projects.map((p) => {
              const days = daysBetween(p.stageSince);
              const done = p.stage === LAST;
              return (
                <article key={p.id} className="project">
                  <div className="project-top">
                    <div>
                      <b>{p.customer}</b>
                      <small>
                        {p.id} · {p.city} · {p.kw} kW {p.segment} · Installer: {p.installer}
                      </small>
                    </div>
                    <div className="right">
                      {done ? (
                        <Pill tone="good">Completed</Pill>
                      ) : (
                        <Pill tone={days > 14 ? "bad" : "info"}>
                          {PROJECT_STAGES[p.stage]} · {days}d
                        </Pill>
                      )}
                    </div>
                  </div>
                  <ol className="stages" aria-label={`Stage ${p.stage + 1} of ${PROJECT_STAGES.length}`}>
                    {PROJECT_STAGES.map((s, i) => (
                      <li key={s} className={i < p.stage || done ? "done" : i === p.stage ? "now" : ""} title={s}>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="project-meta">
                    <span>Value {inr(p.value)}</span>
                    <span>
                      {p.subsidy ? `Subsidy ${inr(p.subsidy)} central + ${inr(p.stateSubsidy)} CG` : "Subsidy N/A (commercial)"}
                    </span>
                    <span className={p.paid < p.value ? "t-warn" : "t-good"}>
                      {p.paid < p.value ? `Due ${inr(p.value - p.paid)}` : "Fully paid"}
                    </span>
                    <span>Booked {shortDate(p.bookedOn)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </Card>
        <div className="stack">
          <Card title="Projects by stage">
            <HBars data={byStage} />
          </Card>
          <Card title="Subsidy process (PM Surya Ghar + CG)">
            <ol className="howto">
              <li>Customer ka registration pmsuryaghar.gov.in par</li>
              <li>CSPDCL se technical feasibility approval</li>
              <li>Empanelled vendor installation karta hai</li>
              <li>CSPDCL net meter application aur installation</li>
              <li>CSPDCL inspection aur commissioning report</li>
              <li>Central subsidy bank account mein, phir CG state subsidy alag se</li>
            </ol>
          </Card>
        </div>
      </div>
    </>
  );
}
