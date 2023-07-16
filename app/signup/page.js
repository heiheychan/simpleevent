import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession  } from "next-auth";

import SignupForm from "./components/SignupForm";

export default async function Signup() {
  // Page protection
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard")
  }

  const nextCookies = cookies();
  const filledEmail = nextCookies.get("email").value;

  return (
    <>
      <div className="w-full max-w-[400px]">
        <h1 className="text-2xl font-bold mb-3">Welcome to Simple event.</h1>
        <p className="text-gray-500">Please fill in your basic info</p>
      </div>
      <SignupForm email={filledEmail} />
    </>
  );
}
