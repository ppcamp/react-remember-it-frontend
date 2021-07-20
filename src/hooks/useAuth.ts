import AuthContext from "app/static-contexts/auth-context";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
