import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT
} from '../reducerTypes/profile';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS: {
      return { ...state, ...action.payload };
    }
    case ADD_PROJECT: {
      return { ...state };
    }
    case DELETE_PROJECT: {
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
