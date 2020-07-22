import { GET_REPORT } from '../actions/types';

const initState = {
  report: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_REPORT:
      return {
        ...state,
        report: action.payload,
      };
    default:
      return state;
  }
}
