"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data, status } = useSession();
  
  return (
    <div className="h-14 flex justify-center">
      <nav className="container flex flex-row justify-between items-center h-full">
        <Link href="/" className="uppercase font-bold text-xl">
          BYOB
        </Link>
        <div className="h-full">
          <div className="h-full flex flex-row items-center">
            {status !== "loading" && (
              <>
                <p className="mr-3">{data.user.email}</p>
                <button
                  className="px-4 h-full bg-red-300"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
