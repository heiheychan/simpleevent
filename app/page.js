import MainHeader from "./components/MainHeader";
import MainPortal from "./components/MainPortal";

export default function Home() {
  return (
    <div>
      <main className="bg-slate-200 min-h-screen flex flex-col items-center ">
        <MainHeader />
        <MainPortal />
      </main>
    </div>
  );
}
