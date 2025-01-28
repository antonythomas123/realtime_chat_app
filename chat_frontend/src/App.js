import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import RoutesConfig from "./routes/Routes";

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
            <RoutesConfig />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
