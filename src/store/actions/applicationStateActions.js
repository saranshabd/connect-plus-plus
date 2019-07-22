import {
  SET_SEARCH_USER_FALSE,
  SET_SEARCH_USER_TRUE
} from '../reducerTypes/applicationState';

export const setSearchUserTrue = () => dispatch =>
  dispatch({
    type: SET_SEARCH_USER_TRUE
  });

export const setSearchUserFalse = () => dispatch =>
  dispatch({
    type: SET_SEARCH_USER_FALSE
  });
