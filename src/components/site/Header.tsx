"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { href: "#calculator", label: "Savings" },
  { href: "#services", label: "Services" },
  { href: "#subsidy", label: "Subsidy" },
  { href: "#areas", label: "Service Area" },
  { href: "#why", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
];

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
    <header className={`site-header${scrolled || open ? " scrolled" : ""}`}>
      <div className="wrap nav">
        <a href="#" aria-label="BNB Enterprises home">
          <Logo />
        </a>
        <ul className={open ? "open" : ""}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/admin">Staff Login</Link>
          </li>
        </ul>
        <a href="#demo" className="btn btn-sun nav-cta">
          Free Site Survey
        </a>
        <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          ☰
        </button>
      </div>
    </header>
  );
}
