import {
  GET_COMPETITIVE_PROGRAMMING,
  UPDATE_COMPETITIVE_PROGRAMMING
} from '../reducerTypes/profile';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPETITIVE_PROGRAMMING: {
      return { ...state, ...action.payload };
    }
    case UPDATE_COMPETITIVE_PROGRAMMING: {
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
