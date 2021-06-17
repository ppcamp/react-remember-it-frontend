import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// default pages
import { DefaultPage } from "pages/Default";
import { Page404 } from "pages/NotFound";
// import routes
import { loginRoutes } from "./services/login";
import { cardRoutes } from "./services/card";

const routes = [
  ...loginRoutes,
  ...cardRoutes,
  {
    path: "/",
    component: DefaultPage,
  },
  {
    path: "*",
    component: Page404,
  },
];

/**
 * Does routing for multipage application
 * @returns A router to every route element
 */
export const Routing = () => {
  return (
    <Router>
      <Switch>
        {routes.map((val, index) => (
          <Route
            path={val.path}
            component={val.component}
            exact
            {...val.props}
            key={index}
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
