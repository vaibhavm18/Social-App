import Post from "@/components/Post";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto h-screen p-2 relative">
      <section className=" h-full relative flex flex-col gap-4  ">
        <span className="px-4 border rounded-xl py-2 font-bold text-2xl md:text-3xl">
          Social
        </span>
        <div className=" overflow-auto flex-auto relative">
          <div
            className="absolute z-50 overflow-auto  border-yellow-500 w-full
          h-full flex flex-col gap-4 border "
          >
            <Post />
          </div>
        </div>
        <div className="px-4 py-2 rounded-xl border md:hidden">Hello God!</div>
      </section>
    </main>
  );
}
