import { UPDATE_SAVING_PERCENTAGE, UPDATE_INCOME, UPDATE_EXPENSE, REMOVE_EXPENSE } from 'constants/actionTypes.js';

const defaultSavingPercentage = null

export default (state = defaultSavingPercentage, action) => {
  switch (action.type) {
    case UPDATE_SAVING_PERCENTAGE:
      return action.payload;
    case UPDATE_INCOME:
      return defaultSavingPercentage;
    case UPDATE_EXPENSE:
      return defaultSavingPercentage;
    case REMOVE_EXPENSE:
      return defaultSavingPercentage;
    default:
      return state;
  }
};