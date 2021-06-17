import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const DefaultPage = (props) => {
  const test = useSelector((state) => state.card.test);
  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <main>
      <h1>{test}</h1>
      <h3>
        Main page <strong>Exibida antes de ir para o login</strong>
      </h3>
      <p>Será colocado imagens do site com exemplos e algumas animações.</p>
    </main>
  );
};
