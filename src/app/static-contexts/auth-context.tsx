import React, { createContext, useContext, useState } from "react";
import { jwt_to_date } from "scripts/datetime";

// Initial state is defined here just for IDE purposes
const initialState = {
  /**
   * Aplication token (JWT)
   */
  token: "",

  /**
   * Refresh the token in the react app and in the browser storage
   * By default, save the value in the session storage
   * @param {string} token The value for the new token
   * @param {boolean} [keepLogged] Store the data in the local section. DEFAULT IS FALSE
   */
  onLogin: (token:string, keepLogged:boolean) => {},

  /**
   * Clear the token from local (and context) storage
   */
  onLogout: () => {},
};
// Context that will hold the auth calls
const AuthContext = createContext(initialState);

export const AuthContextProvider:React.FC<{}> = ({ children }) => {

  // Reading local/session storage
  const storageName = process.env.REACT_APP_TOKEN || "Token";
  const local = localStorage.getItem(storageName) || "";
  const session = sessionStorage.getItem(storageName) || "";
  let token:string = local || session;


  // State
  const [authState, setAuthState] = useState({
    token,
    onLogin: () => {},
    onLogout: () => {},
  });

  if (token) {
    const expires = jwt_to_date(token);
    const now = new Date();

    // If expired, change the token to empty, and show message
    if (now.getTime() >= expires) {
      token = "";
      alert("Sessão expirada. Faça login novamente!");
    }
  }

  // Handlers
  const onLogin = (token:string, keepLogged = false) => {
    if (keepLogged) {
      localStorage.setItem(storageName, token);
    }
    sessionStorage.setItem(storageName, token);
    setAuthState((state) => ({ ...state, token }));
  };
  const onLogout = () => {
    localStorage.removeItem(storageName);
    sessionStorage.removeItem(storageName);
    setAuthState((state) => ({ ...state, token: "" }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
