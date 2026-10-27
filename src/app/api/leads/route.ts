import { LEAD_STATUSES, type LeadStatus } from "@/lib/data";
import { addLead, updateLeadStatus } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const phone = String(body?.phone ?? "").replace(/\D/g, "");
  const city = String(body?.city ?? "").trim();

  if (!name || !city || !/^[6-9]\d{9}$/.test(phone)) {
    return Response.json({ error: "Name, city and a valid 10-digit mobile number are required." }, { status: 400 });
  }

  const lead = addLead({
    name,
    phone: `${phone.slice(0, 5)} ${phone.slice(5)}`,
    city,
    type: String(body?.type ?? "Home"),
    bill: String(body?.bill ?? ""),
  });
  return Response.json({ lead }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  const status = body?.status as LeadStatus;
  if (!LEAD_STATUSES.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }
  const lead = updateLeadStatus(String(body?.id), status);
  if (!lead) return Response.json({ error: "Lead not found" }, { status: 404 });
  return Response.json({ lead });
}
