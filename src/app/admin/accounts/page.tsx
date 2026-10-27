import { Card, grid2, HBars, Kpi, Kpis, List, muted, num, PageHead, Pill, Row, stack, table, td, th } from "@/components/admin/ui";
import { expenses, monthlyRevenue, projectProfit, projects } from "@/lib/data";
import { inr, inrShort, shortDate } from "@/lib/format";
import { btn, cx } from "@/lib/styles";

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

      <Kpis>
        <Kpi label="Order book" value={inrShort(totalValue)} hint={`${projects.length} projects`} />
        <Kpi label="Received" value={inrShort(received)} hint={`${Math.round((received / totalValue) * 100)}% collected`} tone="good" />
        <Kpi label="Pending dues" value={inrShort(totalValue - received)} tone="warn" hint="Customers se lena hai" />
        <Kpi label="Gross profit" value={inrShort(profit)} hint={`${Math.round((profit / totalValue) * 100)}% margin`} tone="good" />
        <Kpi label="Expenses · Oct" value={inrShort(expenseTotal)} hint={`${octExpenses.length} entries`} />
      </Kpis>

      <Card title="Project-wise profit & payments">
        <div className="overflow-x-auto">
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>Project</th>
                <th className={cx(th, num)}>Order value</th>
                <th className={cx(th, num)}>Received</th>
                <th className={cx(th, num)}>Due</th>
                <th className={cx(th, num)}>Material</th>
                <th className={cx(th, num)}>Labour + Other</th>
                <th className={cx(th, num)}>Profit</th>
                <th className={cx(th, num)}>Margin</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const pr = projectProfit(p);
                const due = p.value - p.paid;
                return (
                  <tr key={p.id}>
                    <td className={td}>
                      <b>{p.customer}</b>
                      <small>
                        {p.id} · {p.kw} kW {p.segment}
                      </small>
                    </td>
                    <td className={cx(td, num)}>{inr(p.value)}</td>
                    <td className={cx(td, num)}>{inr(p.paid)}</td>
                    <td className={cx(td, num)}>{due ? <Pill tone="warn">{inr(due)}</Pill> : <Pill tone="good">Paid</Pill>}</td>
                    <td className={cx(td, num)}>{inr(p.materialCost)}</td>
                    <td className={cx(td, num)}>{inr(p.labourCost + p.otherCost)}</td>
                    <td className={cx(td, num)}>
                      <b>{inr(pr)}</b>
                    </td>
                    <td className={cx(td, num)}>{Math.round((pr / p.value) * 100)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className={grid2}>
        <Card title="Expenses · October" action={<button className={btn("plain", "sm")}>+ Add expense</button>}>
          <List>
            {expenses.map((e) => (
              <Row key={e.id} title={e.note} sub={`${shortDate(e.date)} · ${e.category}${e.project ? ` · ${e.project}` : ""}`}>
                <b className={num}>{inr(e.amount)}</b>
              </Row>
            ))}
          </List>
        </Card>
        <div className={stack}>
          <Card title="Kharcha by category">
            <HBars data={byCategory.map((c) => ({ label: c.label, value: Math.round(c.value / 1000) }))} />
            <p className={cx(muted, "mt-2.5 text-[.8rem]")}>Values in ₹ thousand</p>
          </Card>
          <Card title="Monthly revenue">
            <List>
              {monthlyRevenue.map((m) => (
                <Row key={m.month} title={`${m.month} 2026`} sub={`${m.installs} installations`}>
                  <b className={num}>{inr(m.revenue)}</b>
                </Row>
              ))}
            </List>
          </Card>
        </div>
      </div>
    </>
  );
}
