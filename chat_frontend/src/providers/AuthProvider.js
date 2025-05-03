import { createContext, useState } from "react";

export const store = createContext({ isLoggedIn: false });

const { Provider } = store;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        socket,
        setSocket,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </Provider>
  );
};
