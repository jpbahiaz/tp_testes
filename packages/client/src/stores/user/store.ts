import { create } from "zustand";
import { User, UserStore } from "./types";

export const userStore = create<UserStore>((set) => ({
  all: [],
  currentUser: null,
  usersReceived: (users: User[]) => set({ all: users }),
  selectCurrentUser: (user: User) => set({ currentUser: user }),
}));
