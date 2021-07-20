import {
  TransitionAlerts,
  TransitionAlertsProps,
} from "components/ui/TransitionAlerts";
import React, { createContext, useState } from "react";

// Initial state is defined here just for IDE purposes
const alerts: TransitionAlertsProps[] = [];
const initialState = {
  alerts,
  resetAlerts: () => {},
  addAlert: (a: TransitionAlertsProps) => {},
};

// Context that will hold the auth calls
const AlertContext = createContext(initialState);

export const AlertContextProvider: React.FC<{}> = ({ children }) => {
  const [alerts, setAlerts] = useState(initialState.alerts);
  const MAX_ELEMENTS = 5;

  const addAlert = (a: TransitionAlertsProps) => {
    setAlerts((alert) => {
      let aux: TransitionAlertsProps[] = alert;
      if (alert.length === MAX_ELEMENTS) {
        const l = aux.shift();
        if (!l) {
          aux = [];
        }
      }
      return [...aux, a];
    });
  };
  const resetAlerts = () => {
    setAlerts([]);
  };

  const all_alerts = alerts.map((v) => (
    <TransitionAlerts
      severity={v.severity}
      title={v.title}
      message={v.message}
    />
  ));

  return (
    <AlertContext.Provider value={{ alerts, resetAlerts, addAlert }}>
      {/* Only shows this notification if the user already logged into system and its credentials are outdated */}
      {all_alerts}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
