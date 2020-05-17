import {
  GET_PROJECTS, GET_PROJECT, CLEAR_CURRENT_PROJECT, DELETE_PROJECT, CREATE_PROJECT,
} from '../actions/types';

const initialState = {
  projects: [],
  project: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case CLEAR_CURRENT_PROJECT:
      return {
        ...state,
        project: {},
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.projectIdentifier !== action.payload),
      };

    default:
      return state;
  }
}
