import Login from "@/components/Login";

export default function Page() {
  return (
    <section
      className="w-full absolute 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center p-2"
    >
      <Login />
    </section>
  );
}
