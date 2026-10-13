import { redirect } from "next/navigation";

export const metadata = {
  title: "Start Your Order",
  description: "Choose a SmFame service package and enter your public social profile or content link.",
  alternates: { canonical: "/order/" },
  robots: { index: false, follow: false },
};

export default async function OrderPage({ searchParams }) {
  const query = await searchParams;
  const params = new URLSearchParams();
  if (typeof query.service === "string") params.set("service", query.service);
  if (typeof query.package === "string") params.set("package", query.package);
  redirect(params.size ? `/cart?${params.toString()}` : "/cart");
}
