import { combineReducers } from 'redux';
import auth from './auth_reducer';

// Redux requires at least one Reducer defined
export default combineReducers({
  // Every Reducer must define a non-undefined value

  //  auth contains the value auth.token
  auth
});
