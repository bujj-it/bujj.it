import { TOGGLE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

export default (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SAVING_PERCENTAGE:
      return !!action.payload;
    default:
      return state;
  }
};