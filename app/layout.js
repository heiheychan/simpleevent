import NavBar from "./components/NavBar";
import { NextAuthProvider } from "./providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Head from "next/head";
import "./globals.css";
import { headers } from "next/headers";

export const metadata = {
  title: "Simple event",
  description: "A simple event app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const url = new URL(header_url);

  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <body suppressHydrationWarning={true} className="containter bg-gray-100">
        <NextAuthProvider>
            <NavBar session={session} />
            {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
