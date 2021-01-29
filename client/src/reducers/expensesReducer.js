import { UPDATE_EXPENSE, ADD_EXPENSE, REMOVE_EXPENSE } from '../constants/actionTypes.js';
import { v1 as uuidv1 } from 'uuid';

const generateExpense = expenses => {
  return {
    ...expenses,
    [uuidv1()]: {name: '', value: ''}
  }
}

const defaultState = generateExpense({})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return generateExpense(state);
    case REMOVE_EXPENSE:
      const { [action.payload]: value, ...newState } = state;
      return newState;
    case UPDATE_EXPENSE:
      return {
        ...state,
        [action.payload.id]: {
          name: action.payload.name,
          value: parseFloat(action.payload.value, 10) * 100,
        }
      };
    default:
      return state;
  }
};