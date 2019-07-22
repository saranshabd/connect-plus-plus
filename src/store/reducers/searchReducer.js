import {
  CACHE_ALL_USERS,
  SEARCHED_USER_GET_COMPETITIVE_PROGRAMMING,
  SEARCHED_USER_GET_PROJECTS,
  SEARCHED_USER_GET_PUBLIC_PROFILE,
  SEARCHED_USER_GET_TECH_USED,
  GET_SEARCH_ACCESS_TOKEN
} from '../reducerTypes/search';

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CACHE_ALL_USERS: {
      return { ...state, ...action.payload };
    }
    case GET_SEARCH_ACCESS_TOKEN: {
      return { ...state, ...action.payload };
    }
    case SEARCHED_USER_GET_COMPETITIVE_PROGRAMMING: {
      return { ...state, ...action.payload };
    }
    case SEARCHED_USER_GET_PROJECTS: {
      return { ...state, ...action.payload };
    }
    case SEARCHED_USER_GET_PUBLIC_PROFILE: {
      return { ...state, ...action.payload };
    }
    case SEARCHED_USER_GET_TECH_USED: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default searchReducer;
