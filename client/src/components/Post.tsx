import { formateDate } from "@/lib/date";
import Back from "./ui/back";
import PostInteraction, { Like } from "./ui/post-interaction";

type Props = {
  totalLikes: number;
  totalDislikes: number;
  interaction: Like;
  authorName: string;
  title: string;
  createdAt: string;
  description: string;
  id: string;
};

export default function Post({
  totalDislikes,
  totalLikes,
  description,
  authorName,
  createdAt,
  title,
  interaction,
  id,
}: Props) {
  const date = formateDate(createdAt);
  return (
    <div className="px-2 lg:px-5 pt-14 pb-4 relative flex flex-col gap-5">
      <Back />
      <h1 className="font-bold text-lg">{title}</h1>
      <div className="flex justify-around">
        <span className="hover:underline cursor-pointer transition-all duration-150">
          @{authorName}
        </span>
        <span>{date}</span>
      </div>
      <p>{description}</p>
      <PostInteraction
        dislike={totalDislikes}
        like={totalLikes}
        interaction={interaction}
        postId={id}
      />
    </div>
  );
}
