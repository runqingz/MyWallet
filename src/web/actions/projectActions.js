import axios from 'axios';
import {
  GET_ERRORS, GET_PROJECTS, GET_PROJECT, CLEAR_CURRENT_PROJECT, DELETE_PROJECT, CREATE_PROJECT,
} from './types';

export const createProject = (project) => async (dispatch) => {
  try {
    dispatch({ type: GET_ERRORS, payload: {} });
    const res = await axios.post('/api/project', project);
    dispatch({ type: CREATE_PROJECT, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getProjects = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_PROJECT,
  });
  const res = await axios.get('/api/project/all');
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id) => async (dispatch) => {
  const res = await axios.get(`/api/project/${id}`);
  dispatch({
    type: GET_PROJECT,
    payload: res.data,
  });
};

export const deleteProject = (id) => async (dispatch) => {
  await axios.delete(`/api/project/${id}`);
  dispatch({
    type: DELETE_PROJECT,
    payload: id,
  });
};
