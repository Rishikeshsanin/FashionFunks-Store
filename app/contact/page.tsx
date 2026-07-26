import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Contact" };
export default function Page() { return <InfoPage eyebrow="Talk to us" title="How can we help?" intro="Questions about an order, size or return? Send us a message and our team will help."><div className="contact-grid"><ContactForm /><aside><h2>Quick answers</h2><p><strong>Delivery</strong><br />3–6 working days across India.</p><p><strong>Returns</strong><br />Within 15 days for unworn pieces with tags.</p><p><strong>Your privacy</strong><br />We never ask for card details or unnecessary personal information.</p></aside></div></InfoPage>; }
