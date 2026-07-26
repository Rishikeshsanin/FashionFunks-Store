import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "FAQ" };
const questions = [
  ["Where does FashionFunks deliver?", "We currently deliver clothing across India, with most orders arriving in 3–6 working days."],
  ["Do I need an account?", "No. You can browse, save pieces and complete checkout as a guest. An account keeps your wishlist and order history together."],
  ["What does delivery cost?", "Delivery is free at ₹1,999 or above. Orders below that amount include a ₹199 delivery fee."],
  ["How does the order discount work?", "A 5% order-level discount is applied automatically when the merchandise subtotal is above ₹5,000."],
  ["Can I return an item?", "Yes. Unworn items with their original tags can be returned within 15 days of delivery."],
  ["Where is my wishlist stored?", "Your wishlist is saved securely on this device so it remains available when you return."],
] as const;
export default function Page() { return <InfoPage eyebrow="Questions, answered" title="Frequently asked." intro="The useful details, without making you hunt through fine print."><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></InfoPage>; }
