import { UPDATE_INCOME } from 'constants/actionTypes';

const defaultState = null;

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_INCOME:
      return (action.payload.length ? parseFloat(action.payload, 10) * 100 : null);
    default:
      return state;
  }
};
