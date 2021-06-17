import React from "react";
import { Routing } from "routes/index";
import { AuthContextProvider } from "./staticContexts/auth-context";
import { ThemeContextProvider } from "./staticContexts/theme-context";

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
