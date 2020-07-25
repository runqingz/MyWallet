import {
  GET_BACKLOG_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK, GET_SUM, GET_POSTED_SUM,
} from '../actions/types';

const initialState = {
  tasks: [],
  task: {},
  sum: 0,
  postedSum: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case GET_BACKLOG_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.projectSquence !== action.payload),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
      };
    case GET_SUM:
      return {
        ...state,
        sum: action.payload,
      };
    case GET_POSTED_SUM:
      return {
        ...state,
        postedSum: action.payload,
      };
    default:
      return state;
  }
}
