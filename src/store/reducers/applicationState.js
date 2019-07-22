import {
  SET_SEARCH_USER_FALSE,
  SET_SEARCH_USER_TRUE
} from '../reducerTypes/applicationState';

const initialState = {
  searchUser: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_USER_TRUE: {
      return { ...state, searchUser: true };
    }
    case SET_SEARCH_USER_FALSE: {
      return { ...state, searchUser: false };
    }
    default: {
      return { ...state };
    }
  }
};
