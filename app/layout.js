import NavBar from "./components/NavBar";
import { NextAuthProvider } from "./providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import "./globals.css";

export const metadata = {
  title: "Simple event",
  description: "A simple event app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          {session?.user.email ? <NavBar /> : null}
          <main className="flex flex-col items-center pt-12 px-4">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
