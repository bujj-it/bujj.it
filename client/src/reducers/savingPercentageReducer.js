import { UPDATE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

export default (state = null, action) => {
  switch (action.type) {
    case UPDATE_SAVING_PERCENTAGE:
      return action.payload
    default:
      return state;
  }
};