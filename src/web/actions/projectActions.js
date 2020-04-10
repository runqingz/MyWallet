import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS } from './types';

const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/api/project', project);
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:8080/api/project')
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export default { createProject, getProjects };
