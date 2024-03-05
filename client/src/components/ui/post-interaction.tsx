import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

type Props = {
  like: number;
  dislike: number;
  disable?: boolean;
};
export default function PostInteraction({ dislike, like, disable }: Props) {
  const onClick = () => {
    if (disable) {
      return;
    }
  };

  return (
    <div className="flex justify-around  sm:justify-around items-center">
      <div className="flex flex-col gap-1 items-center text-xl  ">
        <FaThumbsUp onClick={onClick} className="cursor-pointer" />
        <span>{like}</span>
      </div>
      <div className="flex flex-col gap-1 items-center text-xl">
        <FaThumbsDown className="cursor-pointer" />
        <span>{dislike}</span>
      </div>
    </div>
  );
}
