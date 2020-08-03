import axios from 'axios';

import {
  GET_PROJECTS, GET_PROJECT,
  DELETE_PROJECT, CREATE_PROJECT, UPDATE_PROJECT,
} from './types';

export const createProject = (project) => (dispatch) => axios.post('/api/project', project)
  .then((res) => {
    dispatch({ type: CREATE_PROJECT, payload: res.data });
  }).catch((error) => error.response);

export const getProject = (id) => (dispatch) => axios.get(`/api/project/${id}`).then((res) => {
  dispatch({
    type: GET_PROJECT,
    payload: res.data,
  });
});

export const deleteProject = async (id) => {
  await axios.delete(`/api/project/${id}`);
  return { type: DELETE_PROJECT, payload: id };
};

export const updateProject = async (project) => {
  const res = await axios.post('/api/project', project);
  return { type: UPDATE_PROJECT, payload: res.data };
};

export const getProjects = async () => {
  const res = await axios.get('/api/project/all');
  return { type: GET_PROJECTS, payload: res.data };
};
