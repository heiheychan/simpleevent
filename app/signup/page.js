import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import SignupForm from "./components/SignupForm";

export default async function Signup() {
  // Page protection
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  const nextCookies = cookies();
  const filledEmail = nextCookies.get("email").value;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="min-w-[390px] border border-gray-500 px-6 py-8 rounded-lg bg-white">
        <h1 className="text-4xl font-light mb-2">Welcome to Simple event.</h1>
        <p className="text-gray-500">Please fill in your basic info</p>
        <SignupForm email={filledEmail} />
      </div>
    </div>
  );
}
