import React, { createContext, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

// import styling
// import style from "./theme.module.css";

const Theme = {
  DARK: false,
  LIGHT: true,
};

const initialState = {
  theme: Theme.LIGHT,
  toggleTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const ThemeContextProvider = (props) => {
  const themePreference =
    document.querySelector("meta[name='theme-color']").content === "white"
      ? Theme.LIGHT
      : Theme.DARK;

  const [theme, setTheme] = useState(themePreference);
  const muitheme = React.useMemo(
    () => createMuiTheme({ palette: { type: theme ? "light" : "dark" } }),
    [theme]
  );

  const themeToggleHandler = () => {
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider
      value={{ ...initialState, toggleTheme: themeToggleHandler }}
    >
      <ThemeProvider theme={muitheme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
