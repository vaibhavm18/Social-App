import { create } from "zustand";

type User = {
  username: string | null;
  _id: string | null;
  token: string | null;
};

type AuthStore = {
  user: User;
  setUser: (credential: User) => void;
  removeUser: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: {
    token: null,
    _id: null,
    username: null,
  },
  setUser: (credential) => {
    set(() => ({ user: credential }));
  },
  removeUser: () =>
    set(() => ({
      user: {
        token: null,
        _id: null,
        username: null,
      },
    })),
}));
