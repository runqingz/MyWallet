import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setJWTToken } from '../securityUtils/JWTUtils';
import { LOGIN, AUTHENTICATION_ERROR, UNAUTHORIZED_ERROR } from './types';

export const userLogin = (loginRequestBody) => (dispatch) => axios.post('api/user/login', loginRequestBody)
  .then((res) => {
    const { token } = res.data;
    setJWTToken(token);

    const decodedBody = { ...jwtDecode(token), token };
    dispatch({
      type: LOGIN,
      payload: decodedBody,
    });
  });

export const handleAuthenticationError = () => (dispatch) => {
  setJWTToken(null);
  dispatch({
    type: AUTHENTICATION_ERROR,
  });
};

export const loadAuthentication = () => (dispatch) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (user && token) {
    setJWTToken(token);
    dispatch({
      type: LOGIN,
      payload: user,
    });
  } else {
    dispatch({
      type: UNAUTHORIZED_ERROR,
    });
  }
};
