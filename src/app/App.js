import { Page404 } from "pages/NotFound";
import { CardCreate } from "pages/cards/Create";
import { CardEdit } from "pages/cards/Edit";

import { Dashboard } from "components/dashboard/index";
import { Deck } from "components/deck/index";
import { DefaultPage } from "pages/Default";
import { Login } from "pages/Login";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Does rounting for multipage application
 * @returns A router to every route element
 */
export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={DefaultPage} />
        <Route path='/login' component={Login} />
        <Route path='/deck/:id' component={Deck} />
        <Route exact path='/card' component={CardCreate} />
        <Route path='/card/edit/:id' component={CardEdit} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='*' component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
