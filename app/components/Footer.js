import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute bottom-2 font-bold">
      <Link href="#">Why simple event?</Link> · <Link href="#">About me</Link>
    </div>
  );
}
