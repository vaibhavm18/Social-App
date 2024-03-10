import { getPosts } from "@/api";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

const posts = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 2323, 123, 13, 14, 15, 16, 17, 18, 19, 20,
];

const fetchPost = async (page: number): Promise<number[]> => {
  await new Promise((res) => setTimeout(res, 5000));
  return posts.slice((page - 1) * 1, page * 4);
};

export default function Posts() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = (await getPosts(pageParam)).data;
      return res;
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  const lastPostRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  if (entry?.isIntersecting) {
    fetchNextPage();
  }
  console.log(data?.pages);

  return (
    <>
      {data?.pages?.map(
        (
          posts: { data: { id: string; title: string; createdAt: string }[] },
          i
        ) => {
          return posts?.data?.map((val, j) => {
            let postRef = null;
            if (i === data?.pages.length - 1 && j === posts.data.length - 1) {
              postRef = ref;
            }
            return (
              <Preview
                title={val.title}
                postRef={postRef}
                id={val.id}
                key={val.id}
                dateStr={val.createdAt}
              />
            );
          });
        }
      )}

      {isError && !isRefetching && (
        <Button
          onClick={() => {
            refetch();
          }}
        >
          Refetch
        </Button>
      )}
      {isLoading && <Spinner />}
      {isFetchingNextPage && <Spinner />}
      {isRefetching && <Spinner />}
    </>
  );
}
