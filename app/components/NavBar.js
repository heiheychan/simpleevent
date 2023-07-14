import Link from "next/link";

export default function NavBar() {
  return (
    <div className="h-14 flex justify-center">
      <nav className="container flex flex-row justify-between items-center h-full">
        <Link href="/" className="uppercase font-bold text-xl">BYOB</Link>
        <div className="h-full">
          <button className="px-4 h-full">Log in</button>
          <button className="px-4 h-full bg-blue-400 text-white">
            Sign up
          </button>
        </div>
      </nav>
    </div>
  );
}
