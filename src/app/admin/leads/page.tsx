import { connection } from "next/server";
import { Suspense } from "react";
import LeadsTable from "@/components/admin/LeadsTable";
import { PageHead } from "@/components/admin/ui";
import { staff } from "@/lib/data";
import { getLeads } from "@/lib/store";

export const metadata = { title: "Leads" };

export default function LeadsPage() {
  return (
    <>
      <PageHead title="Leads" sub="Website, Facebook, Google aur referral se aayi saari enquiries. Status badlo, follow-up karo." />
      <Suspense fallback={<div className="loading">Loading leads…</div>}>
        <LeadsData />
      </Suspense>
    </>
  );
}

async function LeadsData() {
  await connection();
  const team = staff.filter((s) => s.role === "Sales Executive" || s.role === "Manager").map((s) => s.name);
  return <LeadsTable initial={getLeads().map((l) => ({ ...l }))} team={team} />;
}
