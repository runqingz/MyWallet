import {
  LOGIN, AUTHENTICATION_ERROR, UNAUTHORIZED_ERROR, LOGOUT,
} from '../actions/types';
import { setJWTToken } from '../utils/securityUtils/JWTUtils';

const initialState = {
  user: {},
  authenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    case UNAUTHORIZED_ERROR:
      setJWTToken(null);
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    default:
      return state;
  }
}
