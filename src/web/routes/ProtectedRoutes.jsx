import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

export default function ProtectedRoutes(props) {
  const { component: Component, path, authenticated } = props;
  return (
    <Route
      exact
      path={ path }
      render={() => (
        authenticated
          ? <Component component={props.component} />
          : <Redirect to="/login" />
      )}
    />
  );
}
