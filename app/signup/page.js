import { cookies } from "next/headers";

import SignupForm from "./components/SignupForm";

export default function Signup() {
  const nextCookies = cookies();
  const filledEmail = nextCookies.get("email").value;

  return (
    <main className="flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-[400px]">
        <h1 className="text-xl font-bold mb-3">Welcome to Simple event.</h1>
        <p>Please fill in your basic info</p>
      </div>
      <SignupForm email={filledEmail} />
    </main>
  );
}
