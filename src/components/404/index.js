import React from "react";
import { useLocation } from "react-router-dom";

export const Page404 = (props) => {
  let location = useLocation();
  return (
    <main>
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    </main>
  );
};
