import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <Link href="/why" className="underline">Why simple event?</Link> · <Link href="/aboutme" className="underline">About me</Link>
    </div>
  );
}
