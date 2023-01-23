import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from '../pages/Login';

function Routes() {
  const history = useHistory();
  return (
    <div className="meals">
      <Switch>
        <Route
          exact
          path="/"
          render={ history.push('/login') }
        />
        <Route
          path="/login"
          render={ (props) => <Login { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default Routes;
