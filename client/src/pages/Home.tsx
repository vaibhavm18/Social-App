import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto h-screen p-2 relative">
      {" "}
      <section className=" h-full relative flex flex-col gap-4  ">
        <Header />
        <div className=" overflow-auto flex-auto relative">
          <div
            className="absolute z-50 overflow-auto rounded-xl w-full
          h-full flex flex-col gap-4  py-4 px-2 bg-[#040a239e] "
          >
            <Outlet />
          </div>
        </div>
        <BottomNavigation />
      </section>
    </main>
  );
}
