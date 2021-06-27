import React from "react";
import { Routing } from "routes";
import { AuthContextProvider } from "./static-contexts/auth-context";
import { ThemeContextProvider } from "./static-contexts/theme-context";

// import styling
// import style from "./theme.module.css";

export const App = () => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
          <Routing />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
