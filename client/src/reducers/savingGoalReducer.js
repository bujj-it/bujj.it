import { UPDATE_SAVING_GOAL_NAME, UPDATE_SAVING_GOAL_VALUE } from '../constants/actionTypes.js';

const defaultState = {name: '', value: ''}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SAVING_GOAL_NAME:
      return {
        ...state,
        name: action.payload
      };
    case UPDATE_SAVING_GOAL_VALUE:
      let newValue = action.payload.length ? parseFloat(action.payload, 10) * 100 : null
      return {
        ...state,
        value: newValue
      };
    default:
      return state;
  }
};