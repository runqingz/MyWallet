import React from 'react';
import { Redirect } from 'react-router';

export default function LoginRedirect() {
  return (
    <Redirect to="/login" />
  );
}
