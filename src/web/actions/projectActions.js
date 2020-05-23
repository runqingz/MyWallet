import axios from 'axios';
import {
  GET_PROJECTS, GET_PROJECT,
  DELETE_PROJECT, CREATE_PROJECT, UPDATE_PROJECT,
} from './types';

export const createProject = (project) => (dispatch) => axios.post('/api/project', project)
  .then((res) => {
    dispatch({ type: CREATE_PROJECT, payload: res.data });
  }).catch((error) => error.response.data);

// export const getProjects = () => async (dispatch) => {
//   const res = await axios.get('/api/project/all');
//   dispatch({
//     type: GET_PROJECTS,
//     payload: res.data,
//   });
// };
export const getProjects = () => (dispatch) => axios.get('/api/project/all').then((res) => {
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
}).catch((error) => error.response.data);

export const getProject = (id) => (dispatch) => axios.get(`/api/project/${id}`).then((res) => {
  dispatch({
    type: GET_PROJECT,
    payload: res.data,
  });
}).catch((error) => error.response.data);

export const deleteProject = (id) => (dispatch) => axios.delete(`/api/project/${id}`).then((res) => {
  dispatch({
    type: DELETE_PROJECT,
    payload: id,
  });
}).catch((error) => error.response.data);

// export const updateProject = (project) => async (dispatch) => {
//   try {
//     dispatch({ type: GET_ERRORS, payload: {} });
//     const res = await axios.post('/api/project', project);
//     dispatch({ type: UPDATE_PROJECT, payload: res.data });
//   } catch (error) {
//     dispatch({ type: GET_ERRORS, payload: error.response.data });
//   }
// };
export const updateProject = (project) => (dispatch) => axios.post('/api/project', project)
  .then((res) => {
    dispatch({ type: UPDATE_PROJECT, payload: res.data });
  }).catch((error) => error.response.data);
