"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/icons";
import { joinPremium } from "@/lib/premium";

export function PremiumForm({ compact = false, onComplete }: { compact?: boolean; onComplete?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "joined" | "duplicate">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = joinPremium(name, email);
    setStatus(result.duplicate ? "duplicate" : "joined");
    window.setTimeout(() => onComplete?.(), 1400);
  }

  if (status !== "idle") {
    return (
      <div className={`premium-form-success${compact ? " premium-form-success--compact" : ""}`} role="status">
        <span><CheckIcon /></span>
        <h2>{status === "duplicate" ? "You’re already on the list." : "Welcome to Premium."}</h2>
        <p>{status === "duplicate" ? "We found this email in your locally saved membership." : "Your early-access membership is saved on this device."}</p>
      </div>
    );
  }

  return (
    <form className={`premium-form${compact ? " premium-form--compact" : ""}`} onSubmit={submit}>
      <label className="form-field"><span>Your name</span><input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" minLength={2} placeholder="How should we greet you?" required /></label>
      <label className="form-field"><span>Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required /><small>Early access, never inbox clutter. We don’t spam.</small></label>
      <button className="button button--primary button--wide" type="submit">Join FashionFunks Premium</button>
    </form>
  );
}
