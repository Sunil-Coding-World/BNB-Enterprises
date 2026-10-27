"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { EASE_OUT, fadeUp } from "@/lib/motion";

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <motion.div variants={fadeUp} className="border-b border-line py-5">
      <button
        className="flex w-full justify-between gap-4 text-left text-[1.1rem] font-semibold"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {q}
        <motion.span aria-hidden="true" className="text-2xl leading-none text-sun-deep" animate={{ rotate: open ? 45 : 0 }}>
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="pt-2.5 text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq({ items }: { items: string[][] }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} transition={{ staggerChildren: 0.06 }}>
      {items.map(([q, a]) => (
        <Item key={q} q={q} a={a} />
      ))}
    </motion.div>
  );
}
