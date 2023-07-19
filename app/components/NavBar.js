"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar({ session }) {

  const { status } = useSession();

  return (
    <div className="h-14 flex justify-center px-2">
      <nav className="container flex flex-row justify-between items-center h-full">
        <Link href="/">
          <div className="font-serif rounded-lg border-gray-500 border w-10 h-10 flex justify-center items-center">
            S.
          </div>
        </Link>
        {session?.user ? (
          <div className="h-full">
            <div className="h-full flex flex-row items-center">
              {status !== "loading" && session?.user && (
                <>
                  <Link
                    href="/create-event"
                    className="flex justify-center items-center rounded-full h-12 px-4 font-bold border border-gray-500 mr-1"
                  >
                    Create event
                  </Link>
                  <button
                    className="flex justify-center items-center rounded-full h-12 px-4 font-bold border border-gray-500"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
}
