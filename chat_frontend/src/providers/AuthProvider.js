import { createContext, useState } from "react";

export const store = createContext({ isLoggedIn: false });

const { Provider } = store;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</Provider>;
};
