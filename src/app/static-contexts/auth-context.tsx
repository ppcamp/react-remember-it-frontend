import { useAlerts } from "hooks/useAlerts";
import React, { createContext, useState } from "react";
import { jwt_to_date } from "scripts/functions/datetime";

// Initial state is defined here just for IDE purposes
const initialState = {
  /** Aplication token (JWT) */
  token: "",

  /** Check if the token was expired */
  expired: false,

  /**
   * Refresh the token in the react app and in the browser storage
   * By default, save the value in the session storage
   * @param {string} token The value for the new token
   * @param {boolean} [keepLogged] Store the data in the local section. DEFAULT IS FALSE
   */
  onLogin: (token: string, keepLogged: boolean) => {},

  /**
   * Clear the token from local (and context) storage
   */
  onLogout: () => {},
};
// Context that will hold the auth calls
const AuthContext = createContext(initialState);

export const AuthContextProvider: React.FC<{}> = ({ children }) => {
  // Reading local/session storage
  const storageName = process.env.REACT_APP_JWT_TOKEN || "JwtToken";
  const local = localStorage.getItem(storageName) || "";
  const session = sessionStorage.getItem(storageName) || "";
  let token: string = local || session;

  let expired = false;
  if (token.length) {
    const expires = jwt_to_date(token);
    const now = new Date();

    // Show expired message
    if (now.getTime() >= expires) {
      expired = true;
    }
  }

  // ui
  const alerts = useAlerts();
  if (expired) {
    /* Only shows this notification if the user already logged into system and its credentials are outdated */
    alerts.addAlert({
      severity: "warning",
      title: "Sua sessão expirou!",
      message:
        "Faça login novamente no sistema para poder utilizar todos os seus recursos.",
      timeout: 6000,
    });
  }

  // State
  const [authState, setAuthState] = useState({
    token,
    expired,
    onLogin: () => {},
    onLogout: () => {},
  });

  // Handlers
  const onLogin = (token: string, keepLogged = false) => {
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

export default AuthContext;
