import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import backlogReducer from './backlogReducer';
import securityReducer from './securityReducer';
import reportReducer from './reportReducer';

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  authentication: securityReducer,
  report: reportReducer,
});
