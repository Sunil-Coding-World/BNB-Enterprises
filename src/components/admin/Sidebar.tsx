"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import { EASE_OUT } from "@/lib/motion";
import { cx } from "@/lib/styles";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z" },
  { href: "/admin/leads", label: "Leads", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" },
  { href: "/admin/projects", label: "Projects & Subsidy", icon: "M2 20h20M5 20V9l7-5 7 5v11M9 20v-6h6v6" },
  { href: "/admin/staff", label: "Staff", icon: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM4 22a8 8 0 0 1 16 0" },
  { href: "/admin/accounts", label: "Accounts", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
];

// `pillId` keeps the sliding highlight separate for the desktop and mobile navs.
function NavLinks({ pillId, onNavigate }: { pillId: string; onNavigate?: () => void }) {
  const path = usePathname();
  return (
    <nav className="relative grid gap-1">
      {nav.map((n) => {
        const active = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={onNavigate}
            className={cx(
              "relative flex items-center gap-3 rounded-xl px-3 py-[11px] font-medium transition-colors",
              active ? "font-semibold text-night" : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            {active && <motion.span layoutId={pillId} className="absolute inset-0 rounded-xl bg-sun" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="relative size-5 flex-none">
              <path d={n.icon} />
            </svg>
            <span className="relative">{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: top bar + dropdown nav */}
      <div className="sticky top-0 z-40 md:hidden">
        <div className="flex items-center justify-between bg-night px-4 py-3 text-white">
          <Logo tagline={false} size="sm" />
          <button className="text-2xl" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <motion.span className="inline-block" animate={{ rotate: open ? 90 : 0 }}>
              {open ? "✕" : "☰"}
            </motion.span>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="absolute inset-x-0 top-full overflow-hidden bg-night px-3.5 text-white shadow-lg"
            >
              <div className="py-3">
                <NavLinks pillId="nav-pill-mobile" onNavigate={() => setOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col overflow-hidden bg-night px-3.5 py-[22px] text-white md:flex">
        <div aria-hidden="true" className="cell-grid pointer-events-none absolute inset-x-0 bottom-0 h-[45%] opacity-35 [--cell:28px] [mask-image:linear-gradient(to_top,#000,transparent)]" />
        <Link href="/" className="px-2 pb-[26px]">
          <Logo size="md" />
        </Link>
        <NavLinks pillId="nav-pill" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mt-auto flex items-center gap-2.5 rounded-[14px] bg-white/5 p-3"
        >
          <div className="grid size-9 place-items-center rounded-full bg-leaf text-[.85rem] font-bold text-night">BN</div>
          <div>
            <b>Owner</b>
            <small className="block text-[.78rem] opacity-60">Admin · Demo data</small>
          </div>
        </motion.div>
      </aside>
    </>
  );
}
