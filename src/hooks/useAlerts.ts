import AlertContext from "app/static-contexts/alert-context";
import { useContext } from "react";

export const useAlerts = () => useContext(AlertContext);
