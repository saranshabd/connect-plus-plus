import axios from 'axios';

import { encryptStr, decryptStr } from '../../Utils/string';

// import redux action types
import {
  CACHE_ALL_USERS,
  GET_SEARCH_ACCESS_TOKEN,
  SEARCHED_USER_GET_COMPETITIVE_PROGRAMMING,
  SEARCHED_USER_GET_PROJECTS,
  SEARCHED_USER_GET_PUBLIC_PROFILE,
  SEARCHED_USER_GET_TECH_USED
} from '../reducerTypes/search';

export const cacheAllUsers = useraccesstoken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_SERVER_URL}/search/text-match/get-all`,
        {
          params: {
            token: decryptStr(useraccesstoken)
          }
        }
      )
      .then(result => {
        dispatch({
          type: CACHE_ALL_USERS,
          payload: { users: encryptStr(JSON.stringify(result.data)) }
        });
        resolve();
      })
      .catch(error => {
        reject();
      });
  });
};

let searchAccessToken = '';
export const getSearchAccessTokenValue = () => searchAccessToken;

export const getSearchAccessToken = (useraccesstoken, regno) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_SERVER_URL}/search/text-match/user/regno`,
        {
          params: {
            token: decryptStr(useraccesstoken),
            regno
          }
        }
      )
      .then(data => {
        dispatch({
          type: GET_SEARCH_ACCESS_TOKEN,
          payload: {
            searchAccessToken: encryptStr(data.data.searchAccessToken)
          }
        });
        searchAccessToken = encryptStr(data.data.searchAccessToken);
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const getPublicProfile = searchAccessToken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_DEV_SERVER_URL}/search/profiles/public`, {
        params: {
          token: decryptStr(searchAccessToken)
        }
      })
      .then(data => {
        dispatch({
          type: SEARCHED_USER_GET_PUBLIC_PROFILE,
          payload: { public: { ...data.data.profile } }
        });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const getProjects = searchAccessToken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_DEV_SERVER_URL}/search/profiles/projects`, {
        params: {
          token: decryptStr(searchAccessToken)
        }
      })
      .then(data => {
        dispatch({
          type: SEARCHED_USER_GET_PROJECTS,
          payload: { projects: data.data.projects }
        });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const getProgrammingProfile = searchAccessToken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_SERVER_URL}/search/profiles/programming`,
        {
          params: {
            token: decryptStr(searchAccessToken)
          }
        }
      )
      .then(data => {
        dispatch({
          type: SEARCHED_USER_GET_COMPETITIVE_PROGRAMMING,
          payload: { programming: { ...data.data.profile } }
        });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const getTechUsed = searchAccessToken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_DEV_SERVER_URL}/search/profiles/tech`, {
        params: {
          token: decryptStr(searchAccessToken)
        }
      })
      .then(data => {
        dispatch({
          type: SEARCHED_USER_GET_TECH_USED,
          payload: { techs: data.data.techs }
        });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};
