import { axiosInstance } from "./base";

// auth
type login = {
  username: string;
  password: string;
};

type signup = {
  email: string;
  username: string;
  password: string;
};

export const login = async (data: login) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const signup = async (data: signup) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const authenticate = async () => {
  const res = await axiosInstance.get("/auth");
  return res.data;
};

export const getPosts = async (page: number) => {
  const res = await axiosInstance.get(`/post?page=${page}`);
  return res;
};

export const getPostById = async (id: string) => {
  const res = await axiosInstance.get(`/post/${id}`);
  return res;
};

export type Post = {
  title: string;
  description: string;
};

// Post
export const createPost = async (post: Post) => {
  const res = await axiosInstance.post("/post/create", post);
  return res;
};

export const like = async (postId: string) => {
  const res = await axiosInstance.put("/post/like/" + postId);
  return res;
};

export const dislike = async (postId: string) => {
  const res = await axiosInstance.put("/post/dislike/" + postId);
  return res;
};

export const removeLike = async (postId: string) => {
  const res = await axiosInstance.put("/post/remove-like/" + postId);
  return res;
};

export const removeDislike = async (postId: string) => {
  const res = await axiosInstance.put("/post/remove-dislike/" + postId);
  return res;
};
