import Preview from "@/components/Preview";
const posts = [1, 2, 3, 4, 5];
export default function Home() {
  return (
    <>
      {posts.map((val) => (
        <Preview id={val.toString()} key={val} />
      ))}
    </>
  );
}
