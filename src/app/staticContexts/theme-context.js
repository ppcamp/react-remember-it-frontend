import React, { createContext, useState } from "react";

export const Theme = {
  DARK: "dark",
  LIGHT: "light",
};

const initialState = {
  theme: Theme.LIGHT,
  toggleTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(initialState.theme);

  const onChangeHandler = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <ThemeContext.Provider
      value={{
        ...initialState,
        toggleTheme: onChangeHandler,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
