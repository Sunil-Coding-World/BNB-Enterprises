import { AttendancePill, Card, grid21, Kpi, Kpis, List, Meter, muted, num, PageHead, table, td, th } from "@/components/admin/ui";
import { staff } from "@/lib/data";
import { inr, inrShort, shortDate } from "@/lib/format";
import { cx } from "@/lib/styles";

export const metadata = { title: "Staff" };

export default function StaffPage() {
  const working = staff.filter((s) => s.attendance === "Present" || s.attendance === "On Field").length;
  const payroll = staff.reduce((s, m) => s + m.salary + m.incentive, 0);
  const sales = staff.filter((s) => s.leadsAssigned > 0).sort((a, b) => b.conversions - a.conversions);

  return (
    <>
      <PageHead title="Staff" sub="Team, aaj ki attendance, sales performance aur salary ek jagah." />

      <Kpis>
        <Kpi label="Total staff" value={String(staff.length)} />
        <Kpi label="Working today" value={`${working}/${staff.length}`} hint={`${staff.filter((s) => s.attendance === "On Field").length} on field`} tone="good" />
        <Kpi label="Absent / Leave" value={String(staff.length - working)} tone="bad" hint="Aaj" />
        <Kpi label="Monthly payroll" value={inrShort(payroll)} hint="Salary + incentive" />
      </Kpis>

      <div className={grid21}>
        <Card title="Team">
          <div className="overflow-x-auto">
            <table className={table}>
              <thead>
                <tr>
                  <th className={th}>Name</th>
                  <th className={th}>Role · Base</th>
                  <th className={th}>Today</th>
                  <th className={th}>Joined</th>
                  <th className={cx(th, num)}>Salary</th>
                  <th className={cx(th, num)}>Incentive</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.id}>
                    <td className={td}>
                      <b>{s.name}</b>
                      <small>
                        {s.id} · {s.phone}
                      </small>
                    </td>
                    <td className={td}>
                      {s.role}
                      <small>📍 {s.base}</small>
                    </td>
                    <td className={td}>
                      <AttendancePill value={s.attendance} />
                    </td>
                    <td className={td}>
                      {shortDate(s.joined)} {s.joined.slice(0, 4)}
                    </td>
                    <td className={cx(td, num)}>{inr(s.salary)}</td>
                    <td className={cx(td, num)}>{s.incentive ? inr(s.incentive) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Sales performance · Oct">
          <List>
            {sales.map((s, i) => {
              const rate = Math.round((s.conversions / s.leadsAssigned) * 100);
              return (
                <li key={s.id} className="grid grid-cols-[1fr_90px_44px] items-center gap-3 border-t border-line-soft py-2.5 first:border-t-0">
                  <div>
                    <b>{s.name}</b>
                    <small className="block text-[.8rem] text-muted">
                      {s.conversions} won / {s.leadsAssigned} leads
                    </small>
                  </div>
                  <Meter pct={rate} delay={i * 0.1} />
                  <b className={num}>{rate}%</b>
                </li>
              );
            })}
          </List>
          <p className={cx(muted, "mt-2.5 text-[.8rem]")}>Incentive rule (example): ₹3,000 per residential booking, 1% of commercial order value.</p>
        </Card>
      </div>
    </>
  );
}
