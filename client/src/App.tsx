import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { authenticate } from "./api";
import Spinner from "./components/ui/spinner";
import { useAuthStore } from "./store/auth";

const Auth = lazy(() => import("./pages/Auth"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Posts = lazy(() => import("./pages/Posts"));
const PostDetail = lazy(() => import("./pages/PostDetail"));

export default function App() {
  const { setUser } = useAuthStore();
  const [enabled, setEnabled] = useState(true);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["Auth"],
    staleTime: Infinity,
    queryFn: async () => await authenticate(),
    enabled: enabled,
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser({
        id: data.user.id,
        token: data.token,
        username: data.user.username,
      });
    }
    if (isLoading) {
      setEnabled(false);
    }
  }, [data, isSuccess, isLoading]);

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center ">
          <Spinner />
        </div>
      }
    >
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center ">
          <Spinner />
        </div>
      ) : (
        <Routes>
          <Route Component={Auth}>
            <Route Component={Login} path="/login" />
            <Route Component={Signup} path="/signup" />
          </Route>
          <Route Component={Home}>
            <Route Component={Posts} path="/" />
            <Route Component={CreatePost} path="/create" />
            <Route Component={PostDetail} path="/:id" />
          </Route>
        </Routes>
      )}
    </Suspense>
  );
}
