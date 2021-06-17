import React from "react";
import { Routing } from "routes";
import { AuthContextProvider } from "./static-contexts/auth-context";
import { ThemeContextProvider } from "./static-contexts/theme-context";

export const App = () => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <Routing />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default App;
