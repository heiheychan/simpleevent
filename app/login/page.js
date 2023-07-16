import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession  } from "next-auth";

import LoginForm from "./components/LoginForm";

export default async function Login() {
  // Page protection
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard")
  };

  const nextCookies = cookies();
  const filledEmail = nextCookies.get("email").value;

  return (
    <>
      <div className="w-full max-w-[400px]">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p></p>
      </div>
      <LoginForm email={filledEmail} />
    </>
  );
}
