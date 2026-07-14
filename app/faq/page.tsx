import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "FAQ" };
const questions = [
  ["Is FashionFunks a real store?", "FashionFunks is a portfolio project that demonstrates a complete shopping experience. No real payment is collected and no physical order is shipped."],
  ["Do I need an account?", "No. You can browse, save pieces locally and complete the demo checkout as a guest. Logging in is optional."],
  ["What would delivery cost?", "In the demo pricing model, delivery is free at ₹1,999 or above. Orders below that amount show a ₹199 delivery fee."],
  ["How does the order discount work?", "A 5% order-level discount is applied automatically when the merchandise subtotal is above ₹5,000."],
  ["Can I return an item?", "The intended store policy is a 15-day return window for unworn items with original tags. Since this is a demo, no return is actually created."],
  ["Where is my wishlist stored?", "Until Supabase credentials are connected, your wishlist and demo account stay only in this browser using local storage."],
] as const;
export default function Page() { return <InfoPage eyebrow="Questions, answered" title="Frequently asked." intro="The useful details, without making you hunt through fine print."><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></InfoPage>; }
