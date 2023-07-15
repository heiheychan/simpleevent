import { cookies } from "next/headers";

import LoginForm from "./components/LoginForm";

export default function Login() {
  const nextCookies = cookies();
  const filledEmail = nextCookies.get("email").value;

  return (
    <main className="flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-[400px]">
        <h1 className="text-xl font-bold">Welcome back!</h1>
        <p></p>
      </div>
      <LoginForm email={filledEmail} />
    </main>
  );
}
