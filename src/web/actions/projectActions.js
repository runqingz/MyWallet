import axios from 'axios';
import swal from 'sweetalert';
import {
  GET_ERRORS, GET_PROJECTS, GET_PROJECT, CLEAR_CURRENT_PROJECT, DELETE_PROJECT,
} from './types';

export const createProject = (project, history) => async (dispatch) => {
  try {
    dispatch({ type: GET_ERRORS, payload: {} });
    await axios.post('/api/project', project);
    history.push('/dashboard');
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
  const willDelete = await swal({
    title: 'Are you sure?',
    text: 'Once deleted, all the task related to the project will also be removed and you will not be able to recover!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  });

  if (willDelete) {
    await axios.delete(`/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
    swal('Project and related tasks are deleted!', {
      icon: 'success',
    });
  } else {
    swal('Cancelled!');
  }
};

export const deleteAction = (id) => async (dispatch) => {
  const res = await axios.get(`/api/project/${id}`);
  dispatch({
    type: GET_PROJECT,
    payload: res.data,
  });
};
