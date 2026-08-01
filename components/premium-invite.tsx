"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { PremiumForm } from "@/components/premium-form";
import { PREMIUM_EVENT, readPremiumMembers } from "@/lib/premium";
import { useDialogFocus } from "@/components/use-dialog-focus";

const VIEWS_KEY = "fashionfunks-premium-product-views-v2";
const SHOWN_KEY = "fashionfunks-premium-invite-shown-v2";

export function PremiumInvite() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeInvite = useCallback(() => setOpen(false), []);
  useDialogFocus(open, dialogRef, closeInvite, closeRef);

  useEffect(() => {
    if (!pathname.startsWith("/product/")) return;
    if (window.sessionStorage.getItem(SHOWN_KEY) || readPremiumMembers().length) return;
    const viewed = new Set<string>(JSON.parse(window.sessionStorage.getItem(VIEWS_KEY) ?? "[]"));
    viewed.add(pathname);
    window.sessionStorage.setItem(VIEWS_KEY, JSON.stringify([...viewed]));
    if (viewed.size >= 2) {
      window.sessionStorage.setItem(SHOWN_KEY, "true");
      const timer = window.setTimeout(() => setOpen(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function closeAfterMembership() {
      window.setTimeout(() => setOpen(false), 1400);
    }
    window.addEventListener(PREMIUM_EVENT, closeAfterMembership);
    return () => {
      window.removeEventListener(PREMIUM_EVENT, closeAfterMembership);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="premium-invite-shell" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeInvite()}>
      <section ref={dialogRef} className="premium-invite" role="dialog" aria-modal="true" aria-labelledby="premium-invite-title" tabIndex={-1}>
        <button ref={closeRef} className="icon-button premium-invite__close" type="button" aria-label="Close Premium invitation" onClick={closeInvite}><CloseIcon /></button>
        <LogoMark className="premium-invite__mark" />
        <span className="eyebrow">A little closer to the edit</span>
        <h2 id="premium-invite-title">See what arrives next.</h2>
        <p>Join FashionFunks Premium for first looks, early-access drops and quieter, better updates.</p>
        <PremiumForm compact onComplete={() => setOpen(false)} />
        <Link href="/premium" onClick={() => setOpen(false)}>Explore Premium first →</Link>
      </section>
    </div>
  );
}
