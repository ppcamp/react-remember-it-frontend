import React from "react";
import { Routing } from "routes";
import { AlertContextProvider } from "./static-contexts/alert-context";
import { AuthContextProvider } from "./static-contexts/auth-context";
import { ThemeContextProvider } from "./static-contexts/theme-context";

// import styling
// import style from "./theme.module.css";

export const App = () => {
  document.title = "Remember It";

  return (
    <ThemeContextProvider>
      <AlertContextProvider>
        <AuthContextProvider>
          <Routing />
        </AuthContextProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
