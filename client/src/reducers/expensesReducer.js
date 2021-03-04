import { v1 as uuidv1 } from 'uuid';
import { UPDATE_EXPENSE, ADD_EXPENSE, REMOVE_EXPENSE } from 'constants/actionTypes';

const generateExpense = expenses => ({
  ...expenses,
  [uuidv1()]: { name: '', value: '' },
});

const removeExpenseFromState = (state, expenseId) => {
  const { [expenseId]: value, ...newState } = state;
  return newState;
};

const defaultState = generateExpense({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return generateExpense(state);
    case REMOVE_EXPENSE:
      return removeExpenseFromState(state, action.payload);
    case UPDATE_EXPENSE:
      return {
        ...state,
        [action.payload.id]: {
          name: action.payload.name,
          value: action.payload.value,
        },
      };
    default:
      return state;
  }
};
