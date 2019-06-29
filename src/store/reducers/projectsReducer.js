import { GET_PROJECTS } from '../reducerTypes/profile';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
