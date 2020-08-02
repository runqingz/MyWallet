import { UNAUTHORIZED_ERROR, ERROR } from './types';

const apiErrorAction = (err) => {
  let errorAction = { type: ERROR };

  if (err.response.status === 401) {
    errorAction = { type: UNAUTHORIZED_ERROR };
  }

  return errorAction;
};

export default apiErrorAction;
