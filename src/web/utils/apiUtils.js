import {
  message,
} from 'antd';

import UnauthenticatedModal from '../components/security/SecurityModal';

const handleApiError = (err, msgKey) => {
  if (err.response.status === 401) {
    message.error({ content: 'Loading Projects', key: msgKey, duration: 0.5 });
    UnauthenticatedModal('Invalid Credentials');
  } else {
    message.error({ content: JSON.stringify(err.response.data), key: msgKey, duration: 1 });
  }
};

export default handleApiError;
