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
