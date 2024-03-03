import Preview from "@/components/Preview";

const posts = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Posts() {
  return (
    <>
      {posts.map((val) => (
        <Preview id={val.toString()} key={val} />
      ))}
    </>
  );
}
