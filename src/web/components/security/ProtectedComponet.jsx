import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default function ProtectedComponet(props) {
  const { authenticated, component } = props;

  if (!authenticated) {
    return (
      <Redirect to="/login" />
    );
  }
  return (
    <Component component={component} />
  );
}
