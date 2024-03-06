import { create } from "zustand";

type User = {
  username?: string;
  _id?: string;
  token?: string;
};

type AuthStore = {
  user: User;
  setUser: (credential: User) => void;
  removeUser: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: {},
  setUser: (credential) => set((_state) => ({ user: credential })),
  removeUser: () => set((_state) => ({ user: {} })),
}));
