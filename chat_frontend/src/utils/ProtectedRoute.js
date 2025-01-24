import { useContext } from "react";
import { store } from "../providers/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(store);

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
};
