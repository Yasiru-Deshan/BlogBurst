import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  fullName: null,
  user: null,
  authenticate: () => {},
  reloadUser: () => {},
});
