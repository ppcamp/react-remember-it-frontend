import React, { createContext, useContext } from "react";

const initialValue = {
  isLogged: true,
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

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
