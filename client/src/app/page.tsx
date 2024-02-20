import Preview from "@/components/Preview";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto border h-screen p-4 relative">
      <section className="border h-full p-2 relative flex flex-col  ">
        <div className="p-5 border">Hello God!</div>
        <div className=" overflow-auto flex-auto relative">
          <div
            className="absolute overflow-auto border border-yellow-500 w-full
          h-full flex flex-col gap-4 p-4"
          >
            <Preview />
            <Preview />
            <Preview />
            <Preview />
            <Preview />
            <Preview />
          </div>
        </div>
        <div className="p-5 border">Hello God!</div>
      </section>
    </main>
  );
}
