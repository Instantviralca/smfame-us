import Link from "next/link";
import Image from "next/image";

export default function Logo({ footer = false }) {
  return (
    <Link href="/" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="SmFame home">
      <Image src="/logo-smfame.webp" alt="SmFame" width={184} height={37} priority={!footer} />
    </Link>
  );
}
