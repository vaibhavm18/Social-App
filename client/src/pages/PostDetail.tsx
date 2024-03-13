import { getPostById } from "@/api";
import Spinner from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetail() {
  const nav = useNavigate();
  const { id } = useParams();

  if (!id) {
    return;
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => (await getPostById(id)).data,
  });

  console.log("first", data.post);

  useEffect(() => {
    if (isError) {
      console.log(error);
      nav(-1);
    }
  }, [isError]);

  return (
    <>
      <section>
        {isLoading ? (
          <Spinner />
        ) : (
          <></>
          // <Post
          //   desc={data?.data.description}
          //   // dislike={data.}
          // />
        )}
      </section>
    </>
  );
}
