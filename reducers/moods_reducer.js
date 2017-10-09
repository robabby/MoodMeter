import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

import {
  CURRENT_MOOD
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.moodsHistory || [];
    case CURRENT_MOOD:
      console.log("/CURRENT_MOOD/ reducer: ", action.payload);
      return { currentMood: action.payload };
    // case CLEAR_LIKED_JOBS:
    //   return [];
    default:
      return state;
  }
}
