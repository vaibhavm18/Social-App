import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Posts from "./pages/Posts";
import Signup from "./pages/Signup";

export default function App() {
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
