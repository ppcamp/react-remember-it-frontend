import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// default pages
import { DefaultPage } from "pages";
import { Page404 } from "pages/NotFound";
// import routes
import { loginRoutes } from "./services/login";
import { cardRoutes } from "./services/card";
import { useAuth } from "app/static-contexts/auth-context";

const publicRoutes = [
  ...loginRoutes,
  {
    path: "/",
    component: DefaultPage,
  },
  {
    path: "*",
    component: Page404,
  },
];

const protectedRoutes = [...cardRoutes];

/**
 * Does routing for multipage application
 * @returns A router to every route element
 */
export const Routing = () => {
  const { isLogged } = useAuth();

  return (
    <Router>
      <Switch>
        {/* Protected routes will redirect when the user isn't logged */}
        {protectedRoutes.map(({ path, component, ...props }, index) => {
          if (isLogged) {
            return (
              <Route
                exact
                path={path}
                key={index}
                {...props}
                component={component}
              />
            );
          } else {
            return <Redirect to={{ pathname: "/" }} />;
          }
        })}

        {/* Public routes are accessed by anyone */}
        {publicRoutes.map(({ path, component, ...props }, index) => (
          <Route
            exact
            path={path}
            key={index}
            {...props}
            component={component}
          ></Route>
        ))}
      </Switch>
    </Router>
  );
};

export default Routing;

// sample
// {
//   path: "/",
//   component: DefaultPage,
//   // props: {
//   //   exact: true,
//   // },
// },
