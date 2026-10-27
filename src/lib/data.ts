// Dummy data for BNB Enterprises. Replace with a real database later.

// Fixed "today" so prerendered pages stay deterministic.
export const TODAY = "2026-10-27";

// Districts we serve across Chhattisgarh (all 33).
export const DISTRICTS = [
  "Raipur", "Durg", "Bhilai (Durg)", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Janjgir-Champa", "Jagdalpur (Bastar)",
  "Ambikapur (Surguja)", "Dhamtari", "Mahasamund", "Baloda Bazar", "Bemetara", "Kawardha (Kabirdham)", "Kanker", "Mungeli",
  "Balod", "Gariaband", "Jashpur", "Koriya", "Surajpur", "Balrampur", "Kondagaon", "Narayanpur", "Bijapur", "Sukma",
  "Dantewada", "Gaurela-Pendra-Marwahi", "Khairagarh", "Mohla-Manpur", "Sarangarh-Bilaigarh", "Shakti", "Manendragarh",
] as const;

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Survey Scheduled",
  "Quotation Sent",
  "Negotiation",
  "Won",
  "Lost",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_SOURCES = ["Website", "Facebook", "Google", "Referral", "Walk-in", "IndiaMART"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export type Lead = {
  id: string;
  name: string;
  phone: string;
  city: string;
  type: string;
  bill: string;
  kw: number;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string;
  nextFollowUp: string | null;
  notes: string;
};

export type Attendance = "Present" | "On Field" | "Absent" | "Leave";

export type Staff = {
  id: string;
  name: string;
  role: "Sales Executive" | "Site Surveyor" | "Installer" | "Technician" | "Accounts" | "Manager";
  base: string;
  phone: string;
  joined: string;
  attendance: Attendance;
  leadsAssigned: number;
  conversions: number;
  salary: number;
  incentive: number;
};

export const PROJECT_STAGES = [
  "Booked",
  "Portal Registered",
  "CSPDCL Feasibility",
  "Material Dispatched",
  "Installed",
  "Net Meter",
  "Inspection",
  "Subsidy Credited",
] as const;

export type Project = {
  id: string;
  customer: string;
  city: string;
  kw: number;
  segment: "Residential" | "Commercial";
  value: number;
  subsidy: number; // central (PM Surya Ghar)
  stateSubsidy: number; // Chhattisgarh state top-up
  paid: number;
  materialCost: number;
  labourCost: number;
  otherCost: number;
  stage: number; // index into PROJECT_STAGES
  stageSince: string;
  installer: string;
  bookedOn: string;
};

export type Expense = {
  id: string;
  date: string;
  category: "Material" | "Labour" | "Transport" | "Salary" | "Office" | "Marketing";
  note: string;
  amount: number;
  project?: string;
};

export const staff: Staff[] = [
  { id: "S01", name: "Rahul Verma", role: "Manager", base: "Raipur", phone: "98271 22314", joined: "2023-04-10", attendance: "Present", leadsAssigned: 6, conversions: 3, salary: 40000, incentive: 12000 },
  { id: "S02", name: "Priya Sahu", role: "Sales Executive", base: "Raipur", phone: "99261 11420", joined: "2024-01-15", attendance: "On Field", leadsAssigned: 14, conversions: 5, salary: 22000, incentive: 15000 },
  { id: "S03", name: "Amit Dewangan", role: "Sales Executive", base: "Bilaspur", phone: "97540 55802", joined: "2024-06-02", attendance: "Present", leadsAssigned: 12, conversions: 3, salary: 20000, incentive: 9000 },
  { id: "S04", name: "Sunil Patel", role: "Site Surveyor", base: "Bhilai", phone: "99073 77123", joined: "2023-09-20", attendance: "On Field", leadsAssigned: 0, conversions: 0, salary: 18000, incentive: 4000 },
  { id: "S05", name: "Mohd. Arif", role: "Installer", base: "Raipur", phone: "88270 44910", joined: "2023-05-11", attendance: "On Field", leadsAssigned: 0, conversions: 0, salary: 16000, incentive: 6000 },
  { id: "S06", name: "Deepak Yadav", role: "Installer", base: "Bilaspur", phone: "70000 18834", joined: "2024-02-28", attendance: "Absent", leadsAssigned: 0, conversions: 0, salary: 15000, incentive: 3000 },
  { id: "S07", name: "Ravi Netam", role: "Technician", base: "Korba", phone: "93011 66271", joined: "2025-03-01", attendance: "Present", leadsAssigned: 0, conversions: 0, salary: 17000, incentive: 2000 },
  { id: "S08", name: "Neha Agrawal", role: "Accounts", base: "Raipur", phone: "98265 90561", joined: "2024-08-19", attendance: "Leave", leadsAssigned: 0, conversions: 0, salary: 22000, incentive: 0 },
];

export const seedLeads: Lead[] = [
  { id: "L1042", name: "Ramesh Agrawal", phone: "98271 23456", city: "Raipur", type: "Home", bill: "₹3,000 – ₹6,000", kw: 4, source: "Website", status: "New", assignedTo: "Priya Sahu", createdAt: "2026-10-27", nextFollowUp: "2026-10-27", notes: "Shankar Nagar. Asked about EMI" },
  { id: "L1041", name: "Sunita Sahu", phone: "99265 88214", city: "Bhilai (Durg)", type: "Home", bill: "₹1,500 – ₹3,000", kw: 2, source: "Facebook", status: "Contacted", assignedTo: "Amit Dewangan", createdAt: "2026-10-26", nextFollowUp: "2026-10-27", notes: "Call back after 6pm" },
  { id: "L1040", name: "Shree Balaji Rice Mill", phone: "98261 40021", city: "Dhamtari", type: "Factory / Industry", bill: "Above ₹15,000", kw: 50, source: "Referral", status: "Negotiation", assignedTo: "Rahul Verma", createdAt: "2026-10-22", nextFollowUp: "2026-10-28", notes: "Wants 30% advance only" },
  { id: "L1039", name: "Vikas Tiwari", phone: "88894 12398", city: "Bilaspur", type: "Home", bill: "₹3,000 – ₹6,000", kw: 3, source: "Google", status: "Survey Scheduled", assignedTo: "Amit Dewangan", createdAt: "2026-10-21", nextFollowUp: "2026-10-29", notes: "Survey on Wed 11am" },
  { id: "L1038", name: "Saraswati Shishu Mandir", phone: "97520 33456", city: "Rajnandgaon", type: "School / Hospital", bill: "Above ₹15,000", kw: 25, source: "Walk-in", status: "Quotation Sent", assignedTo: "Rahul Verma", createdAt: "2026-10-19", nextFollowUp: "2026-10-27", notes: "Committee meeting on 30th" },
  { id: "L1037", name: "Anil Chandrakar", phone: "93009 22871", city: "Durg", type: "Home", bill: "₹1,500 – ₹3,000", kw: 2, source: "Facebook", status: "Lost", assignedTo: "Amit Dewangan", createdAt: "2026-10-17", nextFollowUp: null, notes: "Went with cheaper local vendor" },
  { id: "L1036", name: "Meera Banjare", phone: "98930 76543", city: "Raipur", type: "Home", bill: "₹3,000 – ₹6,000", kw: 3, source: "Website", status: "Won", assignedTo: "Priya Sahu", createdAt: "2026-10-15", nextFollowUp: null, notes: "Booked 3 kW, Amlidih" },
  { id: "L1035", name: "Jain Kirana Store", phone: "99071 54321", city: "Korba", type: "Shop / Office", bill: "₹6,000 – ₹15,000", kw: 8, source: "IndiaMART", status: "Quotation Sent", assignedTo: "Amit Dewangan", createdAt: "2026-10-14", nextFollowUp: "2026-10-26", notes: "Comparing 2 quotes" },
  { id: "L1034", name: "Rajeev Soni", phone: "98279 67890", city: "Raipur", type: "Home", bill: "₹6,000 – ₹15,000", kw: 5, source: "Referral", status: "Won", assignedTo: "Priya Sahu", createdAt: "2026-10-10", nextFollowUp: null, notes: "Referred by Meera Banjare" },
  { id: "L1033", name: "Green City Colony Welfare Samiti", phone: "88715 11234", city: "Bilaspur", type: "Housing Society", bill: "Above ₹15,000", kw: 40, source: "Google", status: "Negotiation", assignedTo: "Rahul Verma", createdAt: "2026-10-08", nextFollowUp: "2026-10-30", notes: "Needs samiti approval" },
  { id: "L1032", name: "Pooja Kashyap", phone: "97553 98765", city: "Jagdalpur (Bastar)", type: "Home", bill: "Below ₹1,500", kw: 1, source: "Facebook", status: "Contacted", assignedTo: "Priya Sahu", createdAt: "2026-10-06", nextFollowUp: "2026-10-25", notes: "Rented house, owner permission needed" },
  { id: "L1031", name: "Harish Verma", phone: "98263 34567", city: "Raigarh", type: "Home", bill: "₹3,000 – ₹6,000", kw: 3, source: "Walk-in", status: "Won", assignedTo: "Amit Dewangan", createdAt: "2026-10-03", nextFollowUp: null, notes: "" },
  { id: "L1030", name: "Sanjeevani Clinic", phone: "99815 45678", city: "Ambikapur (Surguja)", type: "School / Hospital", bill: "₹6,000 – ₹15,000", kw: 10, source: "Website", status: "Survey Scheduled", assignedTo: "Amit Dewangan", createdAt: "2026-10-02", nextFollowUp: "2026-10-28", notes: "" },
  { id: "L1029", name: "Manoj Sinha", phone: "88892 56789", city: "Mahasamund", type: "Home", bill: "₹1,500 – ₹3,000", kw: 2, source: "Google", status: "New", assignedTo: "Priya Sahu", createdAt: "2026-10-01", nextFollowUp: "2026-10-24", notes: "Not picking up" },
];

export const projects: Project[] = [
  { id: "P231", customer: "Meera Banjare", city: "Raipur", kw: 3, segment: "Residential", value: 180000, subsidy: 78000, stateSubsidy: 30000, paid: 110000, materialCost: 122000, labourCost: 9000, otherCost: 4000, stage: 1, stageSince: "2026-10-20", installer: "Mohd. Arif", bookedOn: "2026-10-18" },
  { id: "P230", customer: "Rajeev Soni", city: "Raipur", kw: 5, segment: "Residential", value: 285000, subsidy: 78000, stateSubsidy: 30000, paid: 285000, materialCost: 196000, labourCost: 14000, otherCost: 6000, stage: 3, stageSince: "2026-10-24", installer: "Mohd. Arif", bookedOn: "2026-10-12" },
  { id: "P229", customer: "Harish Verma", city: "Raigarh", kw: 3, segment: "Residential", value: 178000, subsidy: 78000, stateSubsidy: 30000, paid: 178000, materialCost: 120000, labourCost: 9000, otherCost: 6500, stage: 5, stageSince: "2026-10-09", installer: "Deepak Yadav", bookedOn: "2026-10-05" },
  { id: "P228", customer: "Sahu Medical Store", city: "Durg", kw: 10, segment: "Commercial", value: 460000, subsidy: 0, stateSubsidy: 0, paid: 340000, materialCost: 318000, labourCost: 25000, otherCost: 12000, stage: 4, stageSince: "2026-10-15", installer: "Mohd. Arif", bookedOn: "2026-09-22" },
  { id: "P227", customer: "Kavita Dhruw", city: "Bilaspur", kw: 2, segment: "Residential", value: 124000, subsidy: 60000, stateSubsidy: 30000, paid: 124000, materialCost: 83000, labourCost: 7000, otherCost: 2500, stage: 6, stageSince: "2026-09-28", installer: "Deepak Yadav", bookedOn: "2026-09-02" },
  { id: "P226", customer: "Arvind Thakur", city: "Bhilai (Durg)", kw: 4, segment: "Residential", value: 236000, subsidy: 78000, stateSubsidy: 30000, paid: 236000, materialCost: 160000, labourCost: 11000, otherCost: 4000, stage: 7, stageSince: "2026-10-21", installer: "Mohd. Arif", bookedOn: "2026-08-25" },
  { id: "P225", customer: "Mahamaya Steel Industries", city: "Korba", kw: 60, segment: "Commercial", value: 2520000, subsidy: 0, stateSubsidy: 0, paid: 1890000, materialCost: 1770000, labourCost: 120000, otherCost: 65000, stage: 5, stageSince: "2026-09-18", installer: "Deepak Yadav", bookedOn: "2026-08-10" },
  { id: "P224", customer: "Nisha Patel", city: "Raipur", kw: 3, segment: "Residential", value: 176000, subsidy: 78000, stateSubsidy: 30000, paid: 176000, materialCost: 120000, labourCost: 9000, otherCost: 3000, stage: 7, stageSince: "2026-10-02", installer: "Mohd. Arif", bookedOn: "2026-07-30" },
  { id: "P223", customer: "Suresh Markam", city: "Jagdalpur (Bastar)", kw: 2, segment: "Residential", value: 124000, subsidy: 60000, stateSubsidy: 30000, paid: 94000, materialCost: 83000, labourCost: 7000, otherCost: 7000, stage: 6, stageSince: "2026-09-10", installer: "Deepak Yadav", bookedOn: "2026-07-18" },
];

export const expenses: Expense[] = [
  { id: "E501", date: "2026-10-26", category: "Material", note: "Panels 540W × 10 – Waaree", amount: 138000, project: "P230" },
  { id: "E500", date: "2026-10-25", category: "Transport", note: "Pickup to Shankar Nagar, Raipur", amount: 1800, project: "P230" },
  { id: "E499", date: "2026-10-24", category: "Material", note: "GI structure + wiring", amount: 36000, project: "P230" },
  { id: "E498", date: "2026-10-22", category: "Marketing", note: "Facebook ads – October", amount: 12000 },
  { id: "E497", date: "2026-10-20", category: "Labour", note: "Installation team – Sahu Medical, Durg", amount: 25000, project: "P228" },
  { id: "E496", date: "2026-10-15", category: "Office", note: "Office rent – October (Raipur)", amount: 15000 },
  { id: "E495", date: "2026-10-12", category: "Material", note: "Inverter 10 kW – Growatt", amount: 70000, project: "P228" },
  { id: "E494", date: "2026-10-05", category: "Salary", note: "Staff salary – September", amount: 170000 },
  { id: "E493", date: "2026-10-03", category: "Transport", note: "Material truck Raipur → Jagdalpur", amount: 6500, project: "P223" },
];

export const monthlyRevenue = [
  { month: "May", revenue: 1380000, installs: 6 },
  { month: "Jun", revenue: 1120000, installs: 5 },
  { month: "Jul", revenue: 1890000, installs: 8 },
  { month: "Aug", revenue: 3120000, installs: 9 },
  { month: "Sep", revenue: 1810000, installs: 7 },
  { month: "Oct", revenue: 2240000, installs: 8 },
];

export function projectProfit(p: Project) {
  return p.value - p.materialCost - p.labourCost - p.otherCost;
}

export function daysBetween(from: string, to: string = TODAY) {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}
