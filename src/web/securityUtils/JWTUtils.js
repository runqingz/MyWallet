import axios from 'axios';

export const setJWTToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const persistedToken = () => {
  try {
    const token = localStorage.getItem('token');
    setJWTToken(token);
    if (token) return token;

    return undefined;
  } catch (error) {
    return undefined;
  }
};
