import { Card, HBars, Kpi, PageHead, Pill } from "@/components/admin/ui";
import { expenses, monthlyRevenue, projectProfit, projects } from "@/lib/data";
import { inr, inrShort, shortDate } from "@/lib/format";

export const metadata = { title: "Accounts" };

export default function AccountsPage() {
  const totalValue = projects.reduce((s, p) => s + p.value, 0);
  const received = projects.reduce((s, p) => s + p.paid, 0);
  const profit = projects.reduce((s, p) => s + projectProfit(p), 0);
  const octExpenses = expenses.filter((e) => e.date.startsWith("2026-10"));
  const expenseTotal = octExpenses.reduce((s, e) => s + e.amount, 0);

  const byCategory = Object.entries(
    octExpenses.reduce<Record<string, number>>((acc, e) => ((acc[e.category] = (acc[e.category] ?? 0) + e.amount), acc), {}),
  )
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <PageHead title="Accounts" sub="Order value, payment received, pending dues, kharcha aur har project ka profit." />

      <div className="kpis">
        <Kpi label="Order book" value={inrShort(totalValue)} hint={`${projects.length} projects`} />
        <Kpi label="Received" value={inrShort(received)} hint={`${Math.round((received / totalValue) * 100)}% collected`} tone="good" />
        <Kpi label="Pending dues" value={inrShort(totalValue - received)} tone="warn" hint="Customers se lena hai" />
        <Kpi label="Gross profit" value={inrShort(profit)} hint={`${Math.round((profit / totalValue) * 100)}% margin`} tone="good" />
        <Kpi label="Expenses · Oct" value={inrShort(expenseTotal)} hint={`${octExpenses.length} entries`} />
      </div>

      <Card title="Project-wise profit & payments">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th className="num">Order value</th>
                <th className="num">Received</th>
                <th className="num">Due</th>
                <th className="num">Material</th>
                <th className="num">Labour + Other</th>
                <th className="num">Profit</th>
                <th className="num">Margin</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const pr = projectProfit(p);
                const due = p.value - p.paid;
                return (
                  <tr key={p.id}>
                    <td>
                      <b>{p.customer}</b>
                      <small>
                        {p.id} · {p.kw} kW {p.segment}
                      </small>
                    </td>
                    <td className="num">{inr(p.value)}</td>
                    <td className="num">{inr(p.paid)}</td>
                    <td className="num">{due ? <Pill tone="warn">{inr(due)}</Pill> : <Pill tone="good">Paid</Pill>}</td>
                    <td className="num">{inr(p.materialCost)}</td>
                    <td className="num">{inr(p.labourCost + p.otherCost)}</td>
                    <td className="num">
                      <b>{inr(pr)}</b>
                    </td>
                    <td className="num">{Math.round((pr / p.value) * 100)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid-2">
        <Card title="Expenses · October" action={<button className="btn btn-plain small">+ Add expense</button>}>
          <ul className="list">
            {expenses.map((e) => (
              <li key={e.id}>
                <div>
                  <b>{e.note}</b>
                  <small>
                    {shortDate(e.date)} · {e.category}
                    {e.project ? ` · ${e.project}` : ""}
                  </small>
                </div>
                <div className="right">
                  <b className="num">{inr(e.amount)}</b>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <div className="stack">
          <Card title="Kharcha by category">
            <HBars data={byCategory.map((c) => ({ label: c.label, value: Math.round(c.value / 1000) }))} />
            <p className="muted small">Values in ₹ thousand</p>
          </Card>
          <Card title="Monthly revenue">
            <ul className="list">
              {monthlyRevenue.map((m) => (
                <li key={m.month}>
                  <div>
                    <b>{m.month} 2026</b>
                    <small>{m.installs} installations</small>
                  </div>
                  <div className="right">
                    <b className="num">{inr(m.revenue)}</b>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
