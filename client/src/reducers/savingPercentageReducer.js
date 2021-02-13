import { UPDATE_SAVING_PERCENTAGE, UPDATE_INCOME, UPDATE_EXPENSE, REMOVE_EXPENSE, RESET_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

const defaultSavingPercentage = null

export default (state = defaultSavingPercentage, action) => {
  switch (action.type) {
    case UPDATE_SAVING_PERCENTAGE:
      return action.payload;
    case UPDATE_INCOME:
    case UPDATE_EXPENSE:
    case REMOVE_EXPENSE:
    case RESET_SAVING_PERCENTAGE:
      return defaultSavingPercentage;
    default:
      return state;
  }
};
