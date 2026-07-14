import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Contact" };
export default function Page() { return <InfoPage eyebrow="Talk to us" title="How can we help?" intro="This is a portfolio contact flow. Use it to experience the form — it will not send external email."><div className="contact-grid"><ContactForm /><aside><h2>Quick answers</h2><p><strong>Delivery</strong><br />3–6 working days across India in this demo.</p><p><strong>Returns</strong><br />Within 15 days for unworn pieces with tags.</p><p><strong>Real purchases</strong><br />FashionFunks currently collects no money or personal address data.</p></aside></div></InfoPage>; }
