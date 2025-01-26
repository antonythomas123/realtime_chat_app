import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { Dashboard, SignIn, SignUp } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import AuthRoute from "./layouts/AuthRoute";

const theme = createTheme({
  typography: {
    fontFamily: "jetbrains",
  },
});

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <AuthRoute isProtected={true} redirectTo={"/login"}>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <AuthRoute isProtected={false} redirectTo={"/dashboard"}>
                    <SignIn />
                  </AuthRoute>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <AuthRoute isProtected={false} redirectTo={"/dashboard"}>
                    <SignUp />
                  </AuthRoute>
                }
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
