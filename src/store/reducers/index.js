import { combineReducers } from 'redux';

// import all reducers
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
