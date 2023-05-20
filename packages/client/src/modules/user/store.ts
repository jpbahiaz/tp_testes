import { create } from "zustand";
import { User, UserStore } from "./types";
import { produce } from "immer";

export const userStore = create<UserStore>((set) => ({
  all: [],
  currentUser: null,
  usersReceived: (users: User[]) => set({ all: users }),
  selectCurrentUser: (user: User) => set({ currentUser: user }),
  addUser: (user: User) =>
    set(
      produce<UserStore>((state) => {
        state.all.push(user);
      })
    ),
}));
