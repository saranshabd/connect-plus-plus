import { CACHE_ALL_USERS } from '../reducerTypes/search';

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CACHE_ALL_USERS: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default searchReducer;
