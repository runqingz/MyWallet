import axios from 'axios';
import { GET_REPORT } from './types';

const getReport = (dispatch) => axios.get('api/backlog/stats').then((res) => {
  console.log(res.data);
  dispatch({
    type: GET_REPORT,
    payload: res.data,
  });
});

export default getReport;
