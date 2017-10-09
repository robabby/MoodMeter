import {
  CURRENT_MOOD
} from './types';

export const setCurrentMood = (mood) => {
  console.log("/setCurrentMood/ actions: ", mood);
  return {
    payload: mood,
    type: CURRENT_MOOD
  };
}
