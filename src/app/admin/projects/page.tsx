import * as motion from "motion/react-client";
import { Card, grid21, HBars, Kpi, Kpis, PageHead, Pill, stack, toneText } from "@/components/admin/ui";
import { daysBetween, PROJECT_STAGES, projects } from "@/lib/data";
import { inr, inrShort, shortDate } from "@/lib/format";
import { fadeUp, inView, stagger } from "@/lib/motion";
import { cx } from "@/lib/styles";

export const metadata = { title: "Projects & Subsidy" };

const LAST = PROJECT_STAGES.length - 1;

export default function ProjectsPage() {
  const active = projects.filter((p) => p.stage < LAST);
  const subsidyDue = projects.filter((p) => p.subsidy > 0 && p.stage < LAST);
  const byStage = PROJECT_STAGES.map((s, i) => ({ label: s, value: projects.filter((p) => p.stage === i).length }));

  return (
    <>
      <PageHead title="Projects & Subsidy Tracker" sub="Booking se lekar PM Surya Ghar subsidy credit hone tak har project ka status." />

      <Kpis>
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
      </Kpis>

      <div className={grid21}>
        <Card title="All projects">
          <motion.div {...inView} variants={stagger(0.06)} className="grid gap-3">
            {projects.map((p) => {
              const days = daysBetween(p.stageSince);
              const done = p.stage === LAST;
              return (
                <motion.article
                  key={p.id}
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  className="rounded-[14px] border border-line-soft px-4 py-3.5 transition-shadow hover:shadow-[0_10px_24px_-16px_rgba(11,26,46,.35)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <b>{p.customer}</b>
                      <small className="block text-[.8rem] text-muted">
                        {p.id} · {p.city} · {p.kw} kW {p.segment} · Installer: {p.installer}
                      </small>
                    </div>
                    {done ? (
                      <Pill tone="good">Completed</Pill>
                    ) : (
                      <Pill tone={days > 14 ? "bad" : "info"}>
                        {PROJECT_STAGES[p.stage]} · {days}d
                      </Pill>
                    )}
                  </div>
                  <ol className="mt-3.5 mb-2.5 grid grid-cols-8 gap-0.5" aria-label={`Stage ${p.stage + 1} of ${PROJECT_STAGES.length}`}>
                    {PROJECT_STAGES.map((s, i) => {
                      const state = i < p.stage || done ? "done" : i === p.stage ? "now" : "todo";
                      return (
                        <li key={s} title={s} className="relative h-2 bg-[#efe9db] first:rounded-l last:rounded-r">
                          {state !== "todo" && (
                            <motion.span
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.25, delay: 0.2 + i * 0.07 }}
                              className={cx("absolute inset-0 origin-left rounded-[inherit]", state === "done" ? "bg-leaf-deep" : "bg-sun-deep")}
                            />
                          )}
                          {state === "now" && (
                            <span className="absolute top-3 left-0 text-[.68rem] font-semibold whitespace-nowrap text-warn">{s}</span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                  <div className="mt-[22px] flex flex-wrap gap-x-[18px] gap-y-1.5 text-[.82rem] text-muted">
                    <span>Value {inr(p.value)}</span>
                    <span>
                      {p.subsidy ? `Subsidy ${inr(p.subsidy)} central + ${inr(p.stateSubsidy)} CG` : "Subsidy N/A (commercial)"}
                    </span>
                    <span className={p.paid < p.value ? toneText.warn : toneText.good}>
                      {p.paid < p.value ? `Due ${inr(p.value - p.paid)}` : "Fully paid"}
                    </span>
                    <span>Booked {shortDate(p.bookedOn)}</span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </Card>
        <div className={stack}>
          <Card title="Projects by stage">
            <HBars data={byStage} />
          </Card>
          <Card title="Subsidy process (PM Surya Ghar + CG)">
            <ol className="grid list-decimal gap-2 pl-5 text-[.88rem] marker:font-bold marker:text-leaf-deep">
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
