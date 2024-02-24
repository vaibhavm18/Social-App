"use client";
import { useRouter } from "next/navigation";
import PostInteraction from "./ui/post-interaction";

type Props = {
  id: string;
};
export default function Preview({ id }: Props) {
  const router = useRouter();
  const onclick = () => {
    router.push(`${id}`);
  };
  return (
    <div
      onClick={onclick}
      className="border border-gray-800 cursor-pointer hover:scale-[1.01] hover:shadow-sm 
      hover:shadow-gray-700
       mx-2 transition-all duration-300
        py-2 px-4 flex flex-col gap-2 rounded-xl"
    >
      <h1 className="">
        {`React is a JavaScript      library for building user 
                   interfaces, known for
        its component-based architecture and efficient rendering.`}
      </h1>
      <div className="flex justify-between items-center">
        <span className="hover:underline cursor-pointer">@vaibhav18</span>
        <span>12:20</span>
      </div>
      <PostInteraction dislike={100} like={10000} />
    </div>
  );
}
