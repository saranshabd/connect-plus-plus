import {
  GET_PUBLIC_PROFILE,
  UPDATE_PUBLIC_PROFILE
} from '../reducerTypes/profile';

let initialState = {
  firstname: undefined,
  lastname: undefined,
  regno: undefined,
  profilePhotoUrl: undefined,
  branch: undefined,
  joiningYear: undefined
};

let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PUBLIC_PROFILE: {
      return { ...state, ...action.payload };
    }
    case UPDATE_PUBLIC_PROFILE: {
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default profileReducer;
