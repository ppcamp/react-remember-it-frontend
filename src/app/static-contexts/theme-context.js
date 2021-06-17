import React, { createContext, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
  const muitheme = React.useMemo(() => {
    const t = createMuiTheme({
      palette: {
        type: theme ? "light" : "dark",
      },
    });
    return t;
  }, [theme]);

  const themeToggleHandler = () => {
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider
      value={{ ...initialState, toggleTheme: themeToggleHandler }}
    >
      <ThemeProvider theme={muitheme}>
        <main
          style={{
            backgroundColor: muitheme.palette.background.default,
            color: muitheme.palette.text.primary,
          }}
        >
          {props.children}
        </main>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
