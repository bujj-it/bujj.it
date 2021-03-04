import { UPDATE_SAVING_GOAL_NAME, UPDATE_SAVING_GOAL_VALUE } from 'constants/actionTypes';

const defaultState = { name: '', value: '' };

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SAVING_GOAL_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_SAVING_GOAL_VALUE:
      return {
        ...state,
        value: (action.payload.length ? parseFloat(action.payload, 10) * 100 : null),
      };
    default:
      return state;
  }
};
