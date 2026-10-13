import { getService } from "@/lib/services";

export const CART_KEY = "smfame-cart-v1";
export const CART_EVENT = "smfame-cart-updated";

function normalizeItems(value) {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    const service = getService(item?.slug);
    const pack = service?.packages.find((option) => option.quantity === item?.package);
    if (!service || !pack) return [];

    return [{
      key: `${service.slug}:${pack.quantity}`,
      slug: service.slug,
      package: pack.quantity,
      price: pack.price,
      name: service.name,
      platform: service.platform,
      target: service.target,
      count: Math.max(1, Math.min(10, Number(item.count) || 1)),
    }];
  });
}

export function readCart() {
  if (typeof window === "undefined") return [];
  try {
    return normalizeItems(JSON.parse(window.localStorage.getItem(CART_KEY) || "[]"));
  } catch {
    return [];
  }
}

export function writeCart(items) {
  const normalized = normalizeItems(items);
  window.localStorage.setItem(CART_KEY, JSON.stringify(normalized.map(({ slug, package: packageName, count }) => ({
    slug,
    package: packageName,
    count,
  }))));
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: normalized }));
  return normalized;
}

export function addPackageToCart(slug, packageName) {
  const service = getService(slug);
  const pack = service?.packages.find((option) => option.quantity === packageName);
  const current = readCart();
  if (!service || !pack) return current;

  const key = `${service.slug}:${pack.quantity}`;
  if (current.some((item) => item.key === key)) return writeCart(current);
  return writeCart([...current, { slug, package: pack.quantity, count: 1 }]);
}

export function money(value) {
  return `$${value.toFixed(2)}`;
}

export function cartTotal(items) {
  return items.reduce((total, item) => total + Number(item.price.replace("$", "")) * item.count, 0);
}

