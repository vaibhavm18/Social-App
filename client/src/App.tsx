import { Route, Routes } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Posts from "./pages/Posts";

export default function App() {
  return (
    <Routes>
      <Route Component={Home}>
        <Route Component={Posts} path="/" />
        <Route Component={CreatePost} path="/create" />
        <Route Component={PostDetail} path="/:id" />
      </Route>
    </Routes>
  );
}
