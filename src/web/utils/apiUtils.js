import {
  message,
} from 'antd';

import UnauthenticatedModal from '../components/security/SecurityModal';

const handleApiError = (err, msgKey) => {
  if (err.response && err.response.status && err.response.status === 401) {
    message.error({ content: 'Loading Projects', key: msgKey, duration: 0.5 });
    UnauthenticatedModal('Invalid Credentials');
  } else {
    message.error({ content: 'error', key: msgKey, duration: 1 });
  }
};

export default handleApiError;
