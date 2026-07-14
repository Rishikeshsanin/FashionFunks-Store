"use client";

import { useState, type FormEvent } from "react";

const STORAGE_KEY = "fashionfunks-newsletter-v1";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalised = email.trim().toLowerCase();
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
    if (existing.includes(normalised)) {
      setMessage("You’re already on the list — no duplicate emails here.");
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, normalised]));
    setMessage("You’re in. Expect good clothes, never spam.");
    setEmail("");
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" required />
      <button className="button button--light" type="submit">Join the list</button>
      <p className="newsletter-form__message" aria-live="polite">{message}</p>
    </form>
  );
}
