import { combineReducers } from 'redux';

// import all reducers
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import projectsReducer from './projectsReducer';
import competitiveProgrammingReducer from './competitiveProgrammingReducer';
import techUsedReducer from './techUsedReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  publicProfile: profileReducer,
  projects: projectsReducer,
  competitiveProgramming: competitiveProgrammingReducer,
  techUsed: techUsedReducer,
  search: searchReducer
});

export default rootReducer;
