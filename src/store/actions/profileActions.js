import axios from 'axios';

import {
  GET_PUBLIC_PROFILE,
  GET_COMPETITIVE_PROGRAMMING,
  GET_PROJECTS,
  GET_TECH_USED,
  UPDATE_COMPETITIVE_PROGRAMMING,
  UPDATE_PUBLIC_PROFILE,
  ADD_PROJECT,
  DELETE_PROJECT
} from '../reducerTypes/profile';

import { decryptStr } from '../../Utils/string';

export const getPublicProfile = useraccesstoken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/public`, {
        params: {
          token: decryptStr(useraccesstoken)
        }
      })
      .then(response => {
        const {
          firstname,
          lastname,
          regno,
          profilePhotoUrl,
          branch,
          joiningYear
        } = response.data.profile;

        dispatch({
          type: GET_PUBLIC_PROFILE,
          payload: {
            firstname,
            lastname,
            regno,
            profilePhotoUrl,
            branch,
            joiningYear
          }
        });

        resolve();
      })
      .catch(error => {
        reject();
      });
  });
};

export const updatePublicProfile = (
  useraccesstoken,
  toBeUpdate
) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/public`, {
        token: decryptStr(useraccesstoken),
        ...toBeUpdate
      })
      .then(() => {
        dispatch({
          type: UPDATE_PUBLIC_PROFILE
        });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const getProjects = useraccesstoken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/projects`, {
        params: {
          token: decryptStr(useraccesstoken)
        }
      })
      .then(response => {
        const { projects } = response.data;

        dispatch({
          type: GET_PROJECTS,
          payload: { projects }
        });

        resolve();
      })
      .catch(error => {
        reject();
      });
  });
};

export const addProjects = (useraccesstoken, project) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/projects/add`, {
        token: decryptStr(useraccesstoken),
        ...project
      })
      .then(response => {
        dispatch({ type: ADD_PROJECT });
        resolve();
      })
      .catch(error => {
        reject(error.data.message);
      });
  });
};

export const deleteProject = (useraccesstoken, project_id) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/projects`, {
        data: {
          token: decryptStr(useraccesstoken),
          project_id
        }
      })
      .then(() => {
        dispatch({ type: DELETE_PROJECT });
        resolve();
      })
      .catch(error => {
        reject();
      });
  });
};

export const getCompetitiveProgrammingProfile = useraccesstoken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/programming`, {
        params: {
          token: decryptStr(useraccesstoken)
        }
      })
      .then(response => {
        const {
          preferedLanguage,
          codeChefUrl,
          hackerearthUrl,
          topCoderUrl,
          gitHubUrl,
          projectEulerKey
        } = response.data.profile;

        dispatch({
          type: GET_COMPETITIVE_PROGRAMMING,
          payload: {
            preferedLanguage,
            codeChefUrl,
            hackerearthUrl,
            topCoderUrl,
            gitHubUrl,
            projectEulerKey
          }
        });

        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const updateCompetitiveProgrammingWebsite = (
  useraccesstoken,
  toBeUpdate
) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/programming`, {
        token: decryptStr(useraccesstoken),
        ...toBeUpdate
      })
      .then(() => {
        dispatch({ type: UPDATE_COMPETITIVE_PROGRAMMING });
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const getTechUsed = useraccesstoken => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_DEV_SERVER_URL}/profile/tech`, {
        params: {
          token: decryptStr(useraccesstoken)
        }
      })
      .then(response => {
        const { techs } = response.data;

        dispatch({
          type: GET_TECH_USED,
          payload: { techs }
        });

        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};
