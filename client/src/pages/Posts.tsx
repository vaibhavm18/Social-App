import { getPosts } from "@/api";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

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
          posts: {
            data: {
              id: string;
              title: string;
              createdAt: string;
              authorName: string;
            }[];
          },
          i
        ) => {
          if (posts?.data === null && i === 0) {
            return (
              <div
                key={"Empty"}
                className="py-1 px-2 text-center w-full text-3xl"
              >
                Empty
              </div>
            );
          }
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
                username={val.authorName}
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
