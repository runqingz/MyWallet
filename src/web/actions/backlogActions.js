import axios from 'axios';
import {
  GET_BACKLOG_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK, GET_SUM, GET_POSTED_SUM,
} from './types';

export const getBacklogTasks = (id) => (dispatch) => axios.get(`/api/backlog/${id}`).then((res) => {
  dispatch({
    type: GET_BACKLOG_TASKS,
    payload: res.data,
  });
});

export const createBacklogTasks = async (task, id) => {
  const res = await axios.post(`/api/backlog/${id}`, task);
  return { type: CREATE_TASK, payload: res.data };
};

export const deleteTask = (id, taskId) => (dispatch) => axios.delete(`/api/backlog/${id}/${taskId}`).then(() => {
  dispatch({
    type: DELETE_TASK,
    payload: taskId,
  });
});

export const updateTask = (task, id) => (dispatch) => axios.post(`/api/backlog/${id}`, task)
  .then((res) => {
    dispatch({ type: UPDATE_TASK, payload: res.data });
  });

export const getSumById = (id) => (dispatch) => axios.get(`/api/backlog/${id}/sum`)
  .then((res) => {
    dispatch({ type: GET_SUM, payload: res.data });
  });

export const getPostedSumById = (id) => (dispatch) => axios.get(`/api/backlog/${id}/sum?status=POSTED`)
  .then((res) => {
    dispatch({ type: GET_POSTED_SUM, payload: res.data });
  });
