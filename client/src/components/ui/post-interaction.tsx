import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

type Props = {
  like: number;
  dislike: number;
};
export default function PostInteraction({ dislike, like }: Props) {
  return (
    <div className="flex justify-around  sm:justify-around items-center">
      <div className="flex flex-col gap-1 items-center text-xl  ">
        <FaThumbsUp className="cursor-pointer" />
        <span>{like}</span>
      </div>
      <div className="flex flex-col gap-1 items-center text-xl">
        <FaThumbsDown className="cursor-pointer" />
        <span>{dislike}</span>
      </div>
    </div>
  );
}
