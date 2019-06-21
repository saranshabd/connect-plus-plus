import axios from 'axios';

// import redux types
import {
  LOGIN,
  SIGN_UP,
  LOGIN_WITH_SIGN_UP,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_VERIFY,
  FORGOT_PASSWORD_UPDATE
} from '../reducerTypes/auth';

export const loginAction = (regno, password) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_DEV_SERVER_URL}/auth/login`, {
        regno,
        password
      })
      .then(response => {
        // user logged in
        const { useraccesstoken, message } = response.data;

        dispatch({
          type: LOGIN,
          payload: {
            useraccesstoken,
            loginStatus: true,
            message: message
          }
        });
        resolve();
      })
      .catch(error => {
        // authentication failed
        dispatch({
          type: LOGIN,
          payload: {
            userAccessToken: null,
            loginStatus: false,
            message: error.response.data.message
          }
        });
        reject();
      });
  });
};

export const signUpAction = (
  firstname,
  lastname,
  regno,
  password
) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_DEV_SERVER_URL}/auth/sign-up`, {
        firstname,
        lastname,
        regno,
        password
      })
      .then(response => {
        dispatch({
          type: SIGN_UP,
          payload: {
            signUpAccessToken: response.data.token,
            signUpStatus: true,
            message: response.data.message
          }
        });
        resolve();
      })
      .catch(error => {
        // authentication failed
        dispatch({
          type: SIGN_UP,
          payload: {
            message: error.response.data.message
          }
        });
        reject();
      });
  });
};

export const signUpVerifyAction = (signUpAccessToken, otp) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_DEV_SERVER_URL}/auth/sign-up/verify`, {
        token: signUpAccessToken,
        otp
      })
      .then(response => {
        // user logged in
        const { useraccesstoken, message } = response.data;

        dispatch({
          type: LOGIN_WITH_SIGN_UP,
          payload: {
            useraccesstoken,
            loginStatus: true,
            message: message,
            signUpAccessToken: null,
            signUpStatus: false
          }
        });
        resolve();
      })
      .catch(error => {
        // authentication failed
        dispatch({
          type: LOGIN_WITH_SIGN_UP,
          payload: {
            signUpStatus: false,
            message: error.response.data.message
          }
        });
        reject();
      });
  });
};

export const forgotPasswordAction = regno => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_DEV_SERVER_URL}/auth/forgot-password`, {
        regno
      })
      .then(response => {
        // user email id verified
        dispatch({
          type: FORGOT_PASSWORD,
          payload: {
            forgotPasswordAccessToken: response.data.token,
            forgotPasswordStatus: true,
            message: response.data.message
          }
        });
        resolve();
      })
      .catch(error => {
        // authentication failed
        dispatch({
          type: FORGOT_PASSWORD,
          payload: {
            message: error.response.data.message
          }
        });
        reject();
      });
  });
};

export const forgotPasswordVerifyAction = (
  forgotPasswordAccessToken,
  otp
) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_DEV_SERVER_URL}/auth/forgot-password/verify`,
        {
          token: forgotPasswordAccessToken,
          otp
        }
      )
      .then(response => {
        // user otp verified
        dispatch({
          type: FORGOT_PASSWORD_VERIFY,
          payload: {
            forgotPasswordAccessToken: null,
            forgotPasswordVerifyAccessToken: response.data.token,
            forgotPasswordStatus: true,
            message: response.data.message
          }
        });
        resolve();
      })
      .catch(error => {
        // authentication failed
        dispatch({
          type: FORGOT_PASSWORD_VERIFY,
          payload: {
            forgotPasswordStatus: false,
            message: error.response.data.message
          }
        });
        reject();
      });
  });
};

export const forgotPasswordUpdateAction = (
  forgotPasswordVerifyAccessToken,
  password
) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_DEV_SERVER_URL}/auth/forgot-password/update`,
        {
          token: forgotPasswordVerifyAccessToken,
          password
        }
      )
      .then(response => {
        // user password changed
        dispatch({
          type: FORGOT_PASSWORD_UPDATE,
          payload: {
            forgotPasswordVerifyAccessToken: null,
            forgotPasswordStatus: true,
            message: response.data.message
          }
        });
        resolve();
      })
      .catch(error => {
        // authentication failed
        dispatch({
          type: FORGOT_PASSWORD_UPDATE,
          payload: {
            forgotPasswordStatus: false,
            message: error.response.data.message
          }
        });
        reject();
      });
  });
};
