import { AttendancePill, Card, Kpi, PageHead } from "@/components/admin/ui";
import { staff } from "@/lib/data";
import { inr, inrShort, shortDate } from "@/lib/format";

export const metadata = { title: "Staff" };

export default function StaffPage() {
  const working = staff.filter((s) => s.attendance === "Present" || s.attendance === "On Field").length;
  const payroll = staff.reduce((s, m) => s + m.salary + m.incentive, 0);
  const sales = staff.filter((s) => s.leadsAssigned > 0).sort((a, b) => b.conversions - a.conversions);

  return (
    <>
      <PageHead title="Staff" sub="Team, aaj ki attendance, sales performance aur salary ek jagah." />

      <div className="kpis">
        <Kpi label="Total staff" value={String(staff.length)} />
        <Kpi label="Working today" value={`${working}/${staff.length}`} hint={`${staff.filter((s) => s.attendance === "On Field").length} on field`} tone="good" />
        <Kpi label="Absent / Leave" value={String(staff.length - working)} tone="bad" hint="Aaj" />
        <Kpi label="Monthly payroll" value={inrShort(payroll)} hint="Salary + incentive" />
      </div>

      <div className="grid-2-1">
        <Card title="Team">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role · Base</th>
                  <th>Today</th>
                  <th>Joined</th>
                  <th className="num">Salary</th>
                  <th className="num">Incentive</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <b>{s.name}</b>
                      <small>
                        {s.id} · {s.phone}
                      </small>
                    </td>
                    <td>
                      {s.role}
                      <small>📍 {s.base}</small>
                    </td>
                    <td>
                      <AttendancePill value={s.attendance} />
                    </td>
                    <td>
                      {shortDate(s.joined)} {s.joined.slice(0, 4)}
                    </td>
                    <td className="num">{inr(s.salary)}</td>
                    <td className="num">{s.incentive ? inr(s.incentive) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Sales performance · Oct">
          <ul className="list">
            {sales.map((s) => {
              const rate = Math.round((s.conversions / s.leadsAssigned) * 100);
              return (
                <li key={s.id} className="perf">
                  <div>
                    <b>{s.name}</b>
                    <small>
                      {s.conversions} won / {s.leadsAssigned} leads
                    </small>
                  </div>
                  <div className="perf-bar" title={`${rate}% conversion`}>
                    <span style={{ width: `${rate}%` }} />
                  </div>
                  <b className="num">{rate}%</b>
                </li>
              );
            })}
          </ul>
          <p className="muted small">Incentive rule (example): ₹3,000 per residential booking, 1% of commercial order value.</p>
        </Card>
      </div>
    </>
  );
}
