import React, { createContext } from "react";

const initialValue = {
  isLogged: false,
  user: "",
};

const AuthContext = createContext(initialValue);

export const AuthContextProvider = (props) => {
  return (
    <AuthContext.Provider value={initialValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
