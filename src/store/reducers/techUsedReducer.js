import { GET_TECH_USED, DELETE_TECH, ADD_TECH } from '../reducerTypes/profile';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECH_USED: {
      return { ...state, ...action.payload };
    }
    case DELETE_TECH: {
      return { ...state };
    }
    case ADD_TECH: {
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
