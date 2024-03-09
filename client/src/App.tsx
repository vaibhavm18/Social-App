import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { authenticate } from "./api";
import Auth from "./pages/Auth";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Posts from "./pages/Posts";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/auth";

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
      console.log("data hello", data);
      // setUser(data);
    }
    if (isLoading) {
      setEnabled(false);
    }
  }, [data, isSuccess, isLoading]);

  return (
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
  );
}
