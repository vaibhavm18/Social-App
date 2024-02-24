import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social",
  description: "Sharing opinions and more...",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "relative"}>
        <main className="max-w-4xl mx-auto h-screen p-2 relative">
          <section className=" h-full relative flex flex-col gap-4  ">
            <Header />
            <div className=" overflow-auto flex-auto relative">
              <div
                className="absolute z-50 overflow-auto rounded-xl w-full
          h-full flex flex-col gap-4 border py-4"
              >
                {children}
              </div>
            </div>
            <BottomNavigation />
          </section>
        </main>
      </body>
    </html>
  );
}
