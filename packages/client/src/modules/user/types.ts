export type User = {
  id: string
  name: string
  email: string
}

export type UserStore = {
  all: User[];
  currentUser: User | null
  usersReceived: (users: User[]) => void
  selectCurrentUser: (user: User) => void
  addUser: (user: User) => void
}
