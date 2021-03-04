import {
  TOGGLE_SAVING_PERCENTAGE, UPDATE_INCOME, UPDATE_EXPENSE, REMOVE_EXPENSE,
} from 'constants/actionTypes.js';

const defaultToggleState = false;

export default (state = defaultToggleState, action) => {
  switch (action.type) {
    case TOGGLE_SAVING_PERCENTAGE:
      return !!action.payload;
    case UPDATE_INCOME:
      return defaultToggleState;
    case UPDATE_EXPENSE:
      return defaultToggleState;
    case REMOVE_EXPENSE:
      return defaultToggleState;
    default:
      return state;
  }
};
