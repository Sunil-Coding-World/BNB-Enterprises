"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { btn, cx } from "@/lib/styles";
import { EASE_OUT } from "@/lib/motion";

const links = [
  { href: "#calculator", label: "Savings" },
  { href: "#services", label: "Services" },
  { href: "#subsidy", label: "Subsidy" },
  { href: "#areas", label: "Service Area" },
  { href: "#why", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
];

const linkClass = "opacity-85 transition hover:text-sun hover:opacity-100";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        (scrolled || open) && "bg-night/92 shadow-[0_4px_20px_rgba(0,0,0,.2)] backdrop-blur-md",
      )}
    >
      <div className="wrap flex h-16 items-center justify-between text-white">
        <a href="#" aria-label="BNB Enterprises home">
          <Logo size="md" />
        </a>
        <ul className="hidden gap-6 text-[.92rem] font-medium lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkClass}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/admin" className={linkClass}>
              Staff Login
            </Link>
          </li>
        </ul>
        <motion.a href="#demo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className={cx(btn("sun", "sm"), "hidden lg:inline-flex")}>
          Free Site Survey
        </motion.a>
        <button className="text-[1.6rem] text-white lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <motion.span className="inline-block" animate={{ rotate: open ? 90 : 0 }}>
            {open ? "✕" : "☰"}
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden bg-night px-4 font-medium text-white lg:hidden"
          >
            {[...links, { href: "/admin", label: "Staff Login" }].map((l, i) => (
              <motion.li key={l.href} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                <Link href={l.href} onClick={() => setOpen(false)} className={cx(linkClass, "block py-3")}>
                  {l.label}
                </Link>
              </motion.li>
            ))}
            <li className="pt-2 pb-5">
              <a href="#demo" onClick={() => setOpen(false)} className={cx(btn("sun"), "w-full")}>
                Free Site Survey
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
