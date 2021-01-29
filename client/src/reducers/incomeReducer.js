import { UPDATE_INCOME } from '../constants/actionTypes.js';

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_INCOME:
      let newValue = action.payload.length ? parseInt(action.payload, 10) : null
      return newValue
    default:
      return state;
  }
};