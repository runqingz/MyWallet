import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setJWTToken } from '../utils/securityUtils/JWTUtils';
import { LOGIN, AUTHENTICATION_ERROR } from './types';

export const userLoginAction = async (loginRequestBody) => {
  const res = await axios.post('api/user/login', loginRequestBody);
  const { token } = res.data;
  setJWTToken(token);

  const decodedBody = { ...jwtDecode(token), token };

  return { type: LOGIN, payload: decodedBody };
};

export const handleAuthenticationError = () => (dispatch) => {
  setJWTToken(null);
  dispatch({
    type: AUTHENTICATION_ERROR,
  });
};
