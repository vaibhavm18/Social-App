import { create } from "zustand";

type User = {
  username: string | null;
  id: string | null;
  token: string | null;
};

type AuthStore = {
  user: User;
  setUser: (credential: {
    username: string;
    id: string;
    token: string;
  }) => void;
  removeUser: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: {
    token: null,
    id: null,
    username: null,
  },
  setUser: (credential) => {
    localStorage.setItem("token", credential.token);

    return set(() => ({ user: credential }));
  },
  removeUser: () => {
    localStorage.removeItem("token");
    return set(() => ({
      user: {
        token: null,
        id: null,
        username: null,
      },
    }));
  },
}));
