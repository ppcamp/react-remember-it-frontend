import React, { createContext, useState } from "react";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

// Context
const initialState = {
  theme: 0,
  toggleTheme: () => {},
};
const ThemeContext = createContext(initialState);

// Styling
namespace ThemePalette {
  export const Ligth: PaletteOptions = {
    type: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  };
  export const Dark: PaletteOptions = {
    common: {
      black: "#000",
      white: "#fff",
    },
    type: "dark",
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
      // icon: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#2b2b2b",
      default: "#1f1f1f",
    },
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
    // palette: {
    //   background: {
    //     default: "#151515",
    //     paper: "#fff",
    //   },
    // },
  };
}

const useStyles = makeStyles((theme) => ({
  application: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));
const MainTheme: React.FC<{}> = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div
      // style={{
      //   backgroundColor: muitheme.palette.background.default,
      //   color: muitheme.palette.text.primary,
      // }}
      className={classes.application}
    >
      <CssBaseline />
      {props.children}
    </div>
  );
};

export const ThemeContextProvider: React.FC<{}> = (props) => {
  // User configs
  const themePreference =
    (document.querySelector("meta[name='theme-color']") as HTMLMetaElement)
      .content === "white";

  // States
  const [theme, setTheme] = useState(themePreference);
  const muitheme = React.useMemo(() => {
    const t = createMuiTheme({
      palette: theme ? ThemePalette.Ligth : ThemePalette.Dark,
    });
    return t;
  }, [theme]);

  // Handlers
  const themeToggleHandler = () => {
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider
      value={{ ...initialState, toggleTheme: themeToggleHandler }}
    >
      <ThemeProvider theme={muitheme}>
        <MainTheme>{props.children}</MainTheme>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export const usePalette = () => useTheme().palette;
