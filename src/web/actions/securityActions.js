import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setJWTToken } from '../utils/securityUtils/JWTUtils';
import { LOGIN, AUTHENTICATION_ERROR, CLEAR_CURRENT_USER } from './types';

export const userLoginAction = async (loginRequestBody) => {
  const res = await axios.post('api/user/login', loginRequestBody);
  const { token } = res.data;
  setJWTToken(token);

  const decodedBody = { ...jwtDecode(token), token };

  return { type: LOGIN, payload: decodedBody };
};

export const handleAuthenticationError = () => {
  setJWTToken(null);
  return { type: AUTHENTICATION_ERROR };
};

export const clearCurrentUserAction = () => {
  setJWTToken(null);
  return { type: CLEAR_CURRENT_USER };
};
