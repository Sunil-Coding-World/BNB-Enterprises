"use client";

import { useState, type FormEvent } from "react";
import { DISTRICTS } from "@/lib/data";

export default function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const invalid = form.querySelector<HTMLInputElement>("input:invalid");
    if (invalid) {
      invalid.focus();
      setError("Naam aur sahi 10-digit mobile number bhariye.");
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
    }
  }

  if (state === "done") {
    return (
      <div className="card form-ok">
        <div className="big">☀️</div>
        <h3>Thank you!</h3>
        <p>Aapki request mil gayi hai. Hamari team 24 ghante mein call karegi.</p>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={onSubmit} noValidate>
      <h3>Book Free Survey</h3>
      <div className="row">
        <div className="field">
          <label htmlFor="fn">Full name *</label>
          <input id="fn" name="name" required placeholder="Ramesh Kumar" />
        </div>
        <div className="field">
          <label htmlFor="ph">Mobile *</label>
          <input id="ph" name="phone" required inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} placeholder="98XXXXXXXX" />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="ct">Zila (District) *</label>
          <select id="ct" name="city" required defaultValue="Raipur">
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="tp">Property type</label>
          <select id="tp" name="type">
            <option>Home</option>
            <option>Shop / Office</option>
            <option>Factory / Industry</option>
            <option>School / Hospital</option>
            <option>Housing Society</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="mb">Average monthly bill</label>
        <select id="mb" name="bill">
          <option>Below ₹1,500</option>
          <option>₹1,500 – ₹3,000</option>
          <option>₹3,000 – ₹6,000</option>
          <option>₹6,000 – ₹15,000</option>
          <option>Above ₹15,000</option>
        </select>
      </div>
      {error && <p className="form-error">{error}</p>}
      <button className="btn btn-sun" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Book My Free Survey →"}
      </button>
    </form>
  );
}
