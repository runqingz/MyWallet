import {
  message,
} from 'antd';

import UnauthenticatedModal from '../components/security/SecurityModal';
import { UNAUTHORIZED_ERROR } from '../actions/types';

const handleApiError = (dispatch, err, msgKey) => {
  if (err.response.status === 401) {
    message.error({ content: 'Loading Projects', key: msgKey, duration: 0.5 });
    const onOk = () => {
      dispatch({ type: UNAUTHORIZED_ERROR });
    };
    UnauthenticatedModal('Invalid Credentials', onOk);
  } else {
    message.error({ content: JSON.stringify(err.response.data), key: msgKey, duration: 1 });
  }
};

export default handleApiError;
