import { UPDATE_INCOME } from '../constants/actionTypes.js';

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_INCOME:
      let newValue = action.payload.length ? parseFloat(action.payload, 10) * 100 : null
      return newValue
    default:
      return state;
  }
};