import { Grow } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Routing } from "routes";
import { AuthContextProvider } from "./static-contexts/auth-context";
import { ThemeContextProvider } from "./static-contexts/theme-context";

// import styling
// import style from "./theme.module.css";

export const App = () => {
  document.title = "Remember It";

  return (
    <ThemeContextProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        preventDuplicate
        // @ts-ignore: Unreachable code error
        TransitionComponent={Grow}
      >
        <AuthContextProvider>
          <Routing />
        </AuthContextProvider>
      </SnackbarProvider>
    </ThemeContextProvider>
  );
};

export default App;
