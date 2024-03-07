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
      const res = await fetchPost(pageParam);
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

  return (
    <>
      {data?.pages?.map((posts, i) => {
        return posts.map((val, j) => {
          if (i === data?.pages.length - 1 && j === posts.length - 1) {
            return <Preview postRef={ref} id={val + " "} key={val} />;
          }
          return <Preview postRef={null} id={val + " "} key={val} />;
        });
      })}

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
