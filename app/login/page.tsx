import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPage } from "@/components/login-page";

export const metadata: Metadata = { title: "Account", robots: { index: false } };
export default function Page() { return <Suspense fallback={<div className="container page-loading"><div className="skeleton skeleton--title" /></div>}><LoginPage /></Suspense>; }
