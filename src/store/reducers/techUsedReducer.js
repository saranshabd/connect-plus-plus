import { GET_TECH_USED } from '../reducerTypes/profile';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECH_USED: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
