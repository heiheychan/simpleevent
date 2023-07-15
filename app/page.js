import HomeHeader from "./components/HomeHeader";
import HomeForm from "./components/HomeForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-12 px-4">
      {/* HEADER SECTION */}
      <HomeHeader />
      <HomeForm />
      <Footer />
    </main>
  );
}
