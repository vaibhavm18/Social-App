import { formateDate } from "@/lib/date";
import { useNavigate } from "react-router-dom";
import PostInteraction from "./ui/post-interaction";

type Props = {
  id: string;
  postRef?: React.LegacyRef<HTMLDivElement> | null;
  title: string;
  dateStr: string;
};
export default function Preview({ id, postRef, title, dateStr }: Props) {
  const date = formateDate(dateStr);
  const nav = useNavigate();
  const onclick = () => {
    nav("/" + id);
  };
  return (
    <div
      ref={postRef}
      onClick={onclick}
      className="bg-[#030712]  cursor-pointer hover:scale-[1.01] shadow shadow-gray-800 hover:shadow-sm 
      hover:shadow-gray-700
       mx-2 transition-all duration-300
        py-2 px-4 flex flex-col rounded-xl"
    >
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex justify-between items-center mb-4 mt-1 mx-2">
        <span className="hover:underline cursor-pointer opacity-75">
          by-@vaibhav18
        </span>
        <span>{date}</span>
      </div>
      <PostInteraction dislike={100} like={10000} disable />
    </div>
  );
}
