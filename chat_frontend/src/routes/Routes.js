import React from "react";
import { AddFriend, Dashboard, SignIn, SignUp } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoute from "../layouts/AuthRoute";

const RoutesConfig = () => {
  const routes = [
    {
      path: "/login",
      component: SignIn,
      isProtected: false,
      redirectTo: "/dashboard",
    },
    {
      path: "/sign-up",
      component: SignUp,
      isProtected: false,
      redirectTo: "/dashboard",
    },
    {
      path: "/dashboard",
      component: Dashboard,
      isProtected: true,
      redirectTo: "/login",
    },
    {
      path: "/add-friend",
      component: AddFriend,
      isProtected: true,
      redirectTo: "/login",
    },
  ];

  return (
    <React.Fragment>
      <Routes>
        {routes.map(
          ({ path, component: Component, isProtected, redirectTo }) => (
            <Route
              key={path}
              path={path}
              element={
                <AuthRoute isProtected={isProtected} redirectTo={redirectTo}>
                  <Component />
                </AuthRoute>
              }
            />
          )
        )}
        <Route
          path="*"
          element={
            <Navigate
              to={localStorage.getItem("token") ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default RoutesConfig;
