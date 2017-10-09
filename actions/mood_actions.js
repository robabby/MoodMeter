import {
  CURRENT_MOOD
} from './types';

export const setCurrentMood = (mood) => {
  return {
    payload: mood,
    type: CURRENT_MOOD
  };
}
