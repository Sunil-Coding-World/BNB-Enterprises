"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { DISTRICTS } from "@/lib/data";
import { btn, cx } from "@/lib/styles";

const card = "rounded-3xl bg-white p-[26px] text-ink shadow-[0_30px_70px_-20px_rgba(0,0,0,.5)] sm:p-[34px]";
const label = "mb-1.5 block text-[.88rem] font-semibold";
const input = "w-full rounded-xl border-[1.5px] border-line bg-paper px-3.5 py-3 outline-none transition-colors focus:border-sun-deep focus:bg-white";

function Field({ id, text, children }: { id: string; text: string; children: React.ReactNode }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {children}
    </div>
  );
}

export default function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const invalid = form.querySelector<HTMLInputElement>("input:invalid");
    if (invalid) {
      invalid.focus();
      setError("Naam aur sahi 10-digit mobile number bhariye.");
      setShake((n) => n + 1);
      return;
    }
    setError("");
    setState("sending");
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);
    if (res?.ok) {
      setState("done");
    } else {
      setState("idle");
      setError((await res?.json().catch(() => null))?.error ?? "Kuch gadbad hui, dobara try kariye.");
      setShake((n) => n + 1);
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className={cx(card, "px-[30px] py-[50px] text-center")}
        >
          <motion.div
            className="text-5xl"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
          >
            ☀️
          </motion.div>
          <h3 className="my-2.5 text-2xl">Thank you!</h3>
          <p>Aapki request mil gayi hai. Hamari team 24 ghante mein call karegi.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className={card}
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="mb-5 text-2xl">Book Free Survey</h3>
          <div className="grid gap-x-3.5 sm:grid-cols-2">
            <Field id="fn" text="Full name *">
              <input id="fn" name="name" required placeholder="Ramesh Kumar" className={input} />
            </Field>
            <Field id="ph" text="Mobile *">
              <input id="ph" name="phone" required inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} placeholder="98XXXXXXXX" className={input} />
            </Field>
          </div>
          <div className="grid gap-x-3.5 sm:grid-cols-2">
            <Field id="ct" text="Zila (District) *">
              <select id="ct" name="city" required defaultValue="Raipur" className={input}>
                {DISTRICTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field id="tp" text="Property type">
              <select id="tp" name="type" className={input}>
                <option>Home</option>
                <option>Shop / Office</option>
                <option>Factory / Industry</option>
                <option>School / Hospital</option>
                <option>Housing Society</option>
              </select>
            </Field>
          </div>
          <Field id="mb" text="Average monthly bill">
            <select id="mb" name="bill" className={input}>
              <option>Below ₹1,500</option>
              <option>₹1,500 – ₹3,000</option>
              <option>₹3,000 – ₹6,000</option>
              <option>₹6,000 – ₹15,000</option>
              <option>Above ₹15,000</option>
            </select>
          </Field>
          <AnimatePresence>
            {error && (
              <motion.p
                key={shake}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-1 mb-2 text-[.9rem] text-bad"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cx(btn("sun"), "mt-1.5 w-full")}
            type="submit"
            disabled={state === "sending"}
          >
            {state === "sending" ? "Sending…" : "Book My Free Survey →"}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
