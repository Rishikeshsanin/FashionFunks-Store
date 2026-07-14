"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { DemoOrder } from "@/components/checkout-page";
import { UserIcon } from "@/components/icons";
import { useStore } from "@/components/providers";
import { formatMoney } from "@/lib/money";

function safeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  try {
    const url = new URL(value, "https://fashionfunks.local");
    return url.origin === "https://fashionfunks.local" ? `${url.pathname}${url.search}${url.hash}` : "/";
  } catch { return "/"; }
}

export function LoginPage() {
  const { user, login, logout } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    try { setOrders(JSON.parse(window.localStorage.getItem("fashionfunks-orders-v1") ?? "[]")); } catch { setOrders([]); }
  }, [user]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login({ name: name.trim(), email: email.trim().toLowerCase() });
    router.push(safeRedirect(searchParams.get("redirect")));
  }

  if (user) {
    return (
      <div className="account-page container">
        <header className="account-hero"><div className="account-avatar">{user.name.slice(0, 1).toUpperCase()}</div><div><span className="eyebrow">Your FashionFunks account</span><h1>Hi, {user.name.split(" ")[0]}.</h1><p>{user.email}</p></div><button className="button button--outline" type="button" onClick={logout}>Log out</button></header>
        <div className="account-grid">
          <section><h2>Demo order history</h2>{orders.length ? <div className="order-history">{orders.map((order) => <article key={order.id}><div><strong>{order.id}</strong><span>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(order.createdAt))}</span></div><div><span>{order.itemCount} piece{order.itemCount === 1 ? "" : "s"}</span><strong>{formatMoney(order.total)}</strong></div></article>)}</div> : <div className="account-empty"><p>No demo orders yet. Anything you place while logged in will appear here.</p><Link className="arrow-link" href="/shop">Explore the collection →</Link></div>}</section>
          <aside><h2>Account details</h2><dl><div><dt>Name</dt><dd>{user.name}</dd></div><div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>Account type</dt><dd>Portfolio demo</dd></div></dl><p>Supabase-ready authentication will replace this local demo session once project credentials are connected.</p></aside>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-page__visual"><span className="auth-page__quote">“Style is the quickest way to say hello.”</span><span>FashionFunks / Account edit</span></div>
      <section className="auth-card">
        <div className="auth-card__icon"><UserIcon /></div>
        <span className="eyebrow">Optional account</span>
        <h1>{mode === "login" ? "Welcome back." : "Join the good side."}</h1>
        <p>{mode === "login" ? "Log in to keep demo orders and wishlists together." : "Create a lightweight demo account. No phone number, no noise."}</p>
        <div className="auth-tabs" role="tablist"><button role="tab" aria-selected={mode === "login"} className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} type="button">Log in</button><button role="tab" aria-selected={mode === "register"} className={mode === "register" ? "active" : ""} onClick={() => setMode("register")} type="button">Create account</button></div>
        <form onSubmit={submit}>
          <label className="form-field"><span>Your name</span><input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="How should we greet you?" minLength={2} required /></label>
          <label className="form-field"><span>Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required /><small>We don’t spam. This stays in your browser for the demo.</small></label>
          <label className="form-field"><span>Password</span><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={6} placeholder="At least 6 characters" required /></label>
          <button className="button button--primary button--wide" type="submit">{mode === "login" ? "Log in" : "Create demo account"}</button>
        </form>
        <div className="auth-divider"><span>or</span></div>
        <button className="button button--outline button--wide" type="button" disabled>Continue with Google — connect Supabase first</button>
        <p className="auth-note">Shopping never requires an account. <Link href="/shop">Continue as a guest</Link>.</p>
      </section>
    </div>
  );
}
