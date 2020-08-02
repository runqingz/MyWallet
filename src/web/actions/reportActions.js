import axios from 'axios';

import { GET_REPORT } from './types';

const getReportAction = async () => {
  const res = await axios.get('api/backlog/stats');
  return { type: GET_REPORT, payload: res.data };
};

export default getReportAction;
