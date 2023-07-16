import { authOptions } from "@/lib/auth";
import { getServerSession  } from "next-auth";
import { redirect } from "next/navigation";

import HomeHeader from "./components/HomeHeader";
import HomeForm from "./components/HomeForm";
import Footer from "./components/Footer";

export default async function Home() {
  // Page protection
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard")
  }

  return (
    <>
      {/* HEADER SECTION */}
      <HomeHeader />
      <HomeForm />
      <Footer />
    </>
  );
}
