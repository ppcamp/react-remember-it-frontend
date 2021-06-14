import { Page404 } from "components/404/index";
import { CardCreate } from "components/cards/card/create";
import { CardEdit } from "components/cards/card/edit";
import { Dashboard } from "components/cards/dashboard/index";
import { Deck } from "components/cards/deck/index";
import { DefaultPage } from "components/default/index";
import { Login } from "components/login/index";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Does rounting for multipage application
 * @returns A router to every route element
 */
export default function App() {
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
}
