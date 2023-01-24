import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routes() {
  return (
    <div className="meals">
      <Switch>
        <Route
          exact
          path="/"
        />
        <Route
          path="/login"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          path="/register"
          component={ Register }
        />
      </Switch>
    </div>
  );
}

export default Routes;
