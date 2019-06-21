import {
  LOGIN,
  SIGN_UP,
  LOGIN_WITH_SIGN_UP,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_VERIFY,
  FORGOT_PASSWORD_UPDATE
} from '../reducerTypes/auth';

let initialState = {
  // access tokens
  useraccesstoken: null,
  signUpAccessToken: null,
  forgotPasswordAccessToken: null,
  forgotPasswordVerifyAccessToken: null,
  // flags
  loginStatus: false,
  signUpStatus: false,
  forgotPasswordStatus: false,
  // error message
  message: null
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, ...action.payload };
    }
    case SIGN_UP: {
      return { ...state, ...action.payload };
    }
    case LOGIN_WITH_SIGN_UP: {
      return { ...state, ...action.payload };
    }
    case FORGOT_PASSWORD: {
      return { ...state, ...action.payload };
    }
    case FORGOT_PASSWORD_VERIFY: {
      return { ...state, ...action.payload };
    }
    case FORGOT_PASSWORD_UPDATE: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default authReducer;
