import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoute({ children, isProtected, redirectTo }) {
  const token = localStorage.getItem("token");

  if (isProtected && !token) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isProtected && token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default AuthRoute;
