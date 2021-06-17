import { useTheme } from "@material-ui/core";
import AuthContext from "app/static-contexts/auth-context";
import ThemeContext from "app/static-contexts/theme-context";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

export const DefaultPage = (props) => {
  // Redux
  const test = useSelector((state) => state.card.test);
  // ContextAPI
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);
  // MaterialUI theme
  const theme = useTheme();

  return (
    <div
      style={{ background: theme.palette.type === "dark" ? "red" : "black" }}
    >
      <h1>{test}</h1>
      <h3>O usuário {!authCtx.isLogged && "não"} está logado</h3>
      <hr />

      <p>
        Main page <strong>Exibida antes de ir para o login</strong>
      </p>
      <p>Será colocado imagens do site com exemplos e algumas animações.</p>
      <button onClick={themeCtx.toggleTheme}>toggleTheme</button>
    </div>
  );
};
