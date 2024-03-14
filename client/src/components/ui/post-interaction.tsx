import { useInteractionHook } from "@/hooks/useInteractionHook";
import { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

type Props = {
  like: number;
  dislike: number;
  disable?: boolean;
  interaction: Like;
  postId: string;
};

export type Like = "dislike" | "liked" | undefined;
export type Rating = {
  likes: number;
  dislikes: number;
};

export default function PostInteraction({
  dislike = 0,
  like = 0,
  disable,
  interaction,
  postId,
}: Props) {
  const [likedState, setLikedState] = useState<Like>(interaction);
  const [rating, setRating] = useState<Rating>({
    dislikes: dislike,
    likes: like,
  });

  const { dislikePost, likePost, removeDislikePost, removeLikePost } =
    useInteractionHook(setLikedState, setRating);

  const pressLike = async () => {
    if (disable) {
      return;
    }
    if (likedState === "liked") {
      await removeLikePost.mutateAsync(postId);
    } else {
      await likePost.mutateAsync(postId);
    }
  };
  const pressDislike = async () => {
    if (disable) {
      return;
    }
    if (likedState === "dislike") {
      await removeDislikePost.mutateAsync(postId);
    } else {
      await dislikePost.mutateAsync(postId);
    }
  };

  return (
    <div className="flex justify-around  sm:justify-around items-center">
      <div className="flex flex-col gap-1 items-center text-xl  ">
        <FaThumbsUp
          onClick={pressLike}
          className={`cursor-pointer ${
            likedState === "liked" && "text-red-500"
          }`}
        />
        <span>{rating.likes}</span>
      </div>
      <div className="flex flex-col gap-1 items-center text-xl">
        <FaThumbsDown
          onClick={pressDislike}
          className={`cursor-pointer ${
            likedState === "dislike" && "text-red-500"
          }`}
        />
        <span>{rating.dislikes}</span>
      </div>
    </div>
  );
}
