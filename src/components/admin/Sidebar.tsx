"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z" },
  { href: "/admin/leads", label: "Leads", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" },
  { href: "/admin/projects", label: "Projects & Subsidy", icon: "M2 20h20M5 20V9l7-5 7 5v11M9 20v-6h6v6" },
  { href: "/admin/staff", label: "Staff", icon: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM4 22a8 8 0 0 1 16 0" },
  { href: "/admin/accounts", label: "Accounts", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
];

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mobilebar">
        <Logo tagline={false} />
        <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          ☰
        </button>
      </div>
      <aside className={`sidebar${open ? " open" : ""}`}>
        <Link href="/" className="side-logo">
          <Logo />
        </Link>
        <nav>
          {nav.map((n) => {
            const active = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={active ? "active" : ""} onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={n.icon} />
                </svg>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="side-foot">
          <div className="avatar">BN</div>
          <div>
            <b>Owner</b>
            <small>Admin · Demo data</small>
          </div>
        </div>
      </aside>
    </>
  );
}
