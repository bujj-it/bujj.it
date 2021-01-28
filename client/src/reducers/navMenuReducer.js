import { TOGGLE_NAV_MENU } from '../constants/actionTypes.js';

export default (state = null, action) => {
  switch (action.type) {
    case TOGGLE_NAV_MENU:
      return !state;
    default:
      return state;
  }
};