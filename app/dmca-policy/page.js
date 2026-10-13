import LegalPage from "@/components/LegalPage";
const sections = [
  { title: "Copyright reports", body: ["SmFame respects intellectual property rights. A copyright owner or authorized representative may submit a notice identifying material on this website that is believed to infringe copyright."] },
  { title: "Required information", body: ["A notice should include the copyrighted work, the location of the allegedly infringing material, your contact information, a good-faith statement, a statement of accuracy and authority, and a physical or electronic signature."] },
  { title: "Counter-notice", body: ["If material was removed because of mistake or misidentification, the affected party may submit a legally sufficient counter-notice. SmFame may forward notices and counter-notices to the relevant parties."] },
  { title: "Submission", body: ["Copyright notices can be sent through the contact page with “Copyright notice” selected or clearly stated in the message. Incomplete notices may require additional information before they can be processed."] },
];
export const metadata = { title: "DMCA Policy", description: "Learn how to submit a copyright notice or counter-notice concerning material available through SmFame.", alternates: { canonical: "/dmca-policy/" } };
export default function Page() { return <LegalPage eyebrow="Copyright" title="DMCA policy" sections={sections}/>; }
