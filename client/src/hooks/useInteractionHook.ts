import { dislike, like, removeDislike, removeLike } from "@/api";
import { Like, Rating } from "@/components/ui/post-interaction";
import { useMutation } from "@tanstack/react-query";

export const useInteractionHook = (
  setLikedState: React.Dispatch<React.SetStateAction<Like>>,
  setRating: React.Dispatch<React.SetStateAction<Rating>>
) => {
  const likePost = useMutation({
    mutationKey: ["like"],
    mutationFn: async (id: string) => await like(id),
    onSuccess() {
      setRating((prev) => ({ ...prev, likes: prev.likes + 1 }));
      setLikedState("liked");
    },
    onError() {},
  });

  const dislikePost = useMutation({
    mutationKey: ["dislike"],
    mutationFn: async (id: string) => await dislike(id),
    onSuccess() {
      setRating((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
      setLikedState("dislike");
    },
  });

  const removeLikePost = useMutation({
    mutationKey: ["remove like"],
    mutationFn: async (id: string) => await removeLike(id),
    onSuccess() {
      setRating((prev) => ({ ...prev, likes: prev.likes - 1 }));
      setLikedState(undefined);
    },
  });

  const removeDislikePost = useMutation({
    mutationKey: ["remove dislike"],
    mutationFn: async (id: string) => await removeDislike(id),
    onSuccess() {
      setRating((prev) => ({ ...prev, dislikes: prev.dislikes - 1 }));
      setLikedState(undefined);
    },
  });

  return { dislikePost, removeDislikePost, removeLikePost, likePost };
};
