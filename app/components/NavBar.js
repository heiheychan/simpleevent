"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

export default function NavBar({ session }) {
  const { status } = useSession();

  return (
    <div className="h-14 flex justify-center px-2">
      <nav className="container flex flex-row justify-between items-center h-full">
        <div className="flex flex-row items-center gap-4">
          <Link
            href="https://github.com/heiheychan/simpleevent"
            target="_blank"
          >
            <BsGithub size={35} />
          </Link>
        </div>

        {session?.user ? (
          <div className="h-full">
            <div className="h-full flex flex-row items-center">
              {status !== "loading" && session?.user && (
                <>
                  <Link
                    href="/create-event"
                    className="flex justify-center items-center rounded-lg h-12 px-4 bg-orange-500 text-white mr-2 hover:opacity-80"
                  >
                    Create event
                  </Link>
                  <button
                    className="flex justify-center items-center rounded-lg h-12 px-4 bg-white border border-gray-500 text-gray-500 hover:opacity-80"
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
