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
  const { token, expired } = useAuth();
  const isLogged = token.length > 0 && !expired;

  return (
    <Router>
      <Switch>
        {/* Protected routes will redirect when the user isn't logged */}
        {protectedRoutes.map(
          ({ path, component: Component, ...props }, index) => {
            return (
              <Route
                exact
                path={path}
                key={`private${index}`}
                {...props}
                render={(routeProps) => {
                  return isLogged ? (
                    <Component {...routeProps} />
                  ) : (
                    <Redirect to={{ pathname: "/" }} />
                  );
                }}
              />
            );
          }
        )}

        {/* Public routes are accessed by anyone */}
        {publicRoutes.map(({ path, component, ...props }, index) => (
          <Route
            exact
            path={path}
            key={`public${index}`}
            {...props}
            component={component}
          />
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
