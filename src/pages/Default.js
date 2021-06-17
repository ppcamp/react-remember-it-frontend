import AuthContext from "app/staticContexts/auth-context";
import ThemeContext, { Theme } from "app/staticContexts/theme-context";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

export const DefaultPage = (props) => {
  // Redux
  const test = useSelector((state) => state.card.test);
  useEffect(() => {
    console.log(test);
  }, [test]);

  // ContextAPI
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);

  return (
    <main
      style={{ background: themeCtx.theme === Theme.DARK ? "black" : "red" }}
    >
      <h1>{test}</h1>
      <h3>O usuário {!authCtx.isLogged && "não"} está logado</h3>
      <hr />

      <p>
        Main page <strong>Exibida antes de ir para o login</strong>
      </p>
      <p>Será colocado imagens do site com exemplos e algumas animações.</p>
    </main>
  );
};
