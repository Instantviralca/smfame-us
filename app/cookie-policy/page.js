import LegalPage from "@/components/LegalPage";
const sections = [
  { title: "What cookies are", body: ["Cookies and similar technologies are small files or identifiers used by websites to remember preferences, maintain sessions and understand how pages are used."] },
  { title: "How SmFame uses cookies", body: ["Essential cookies help the website function, protect checkout and retain necessary session choices. Analytics cookies can help us understand performance and improve navigation.", "Advertising or personalization cookies should only be enabled when supported by the consent choices shown to the visitor."] },
  { title: "Third-party technology", body: ["Payment, analytics, support and security providers may set their own cookies when their features are used. Their handling of information is governed by their respective policies."] },
  { title: "Managing cookies", body: ["You can block or delete cookies using browser settings. Disabling essential cookies may prevent checkout or other website features from working correctly."] },
];
export const metadata = { title: "Cookie Policy", description: "Learn which cookies SmFame may use, why they are used and how to manage them in your browser.", alternates: { canonical: "/cookie-policy/" } };
export default function Page() { return <LegalPage eyebrow="Your choices" title="Cookie policy" sections={sections}/>; }
