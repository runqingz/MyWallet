import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setJWTToken } from '../utils/securityUtils/JWTUtils';
import { LOGIN, AUTHENTICATION_ERROR } from './types';

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
