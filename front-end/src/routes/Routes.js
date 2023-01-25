import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';

function Routes() {
  return (
    <div className="meals">
      <Switch>
        <Route
          exact
          path="/"
        >
          <Redirect to="login" />
        </Route>

        <Route
          path="/login"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          path="/register"
          component={ Register }
        />
        <Route
          path="/customer/checkout"
          component={ Checkout }
        />
      </Switch>
    </div>
  );
}

export default Routes;
