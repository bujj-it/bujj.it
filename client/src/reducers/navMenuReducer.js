import { TOGGLE_NAV_MENU, CLOSE_NAV_MENU, RESET_NAV_MENU } from 'constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case TOGGLE_NAV_MENU:
      return !state;
    case CLOSE_NAV_MENU:
      return false;
    case RESET_NAV_MENU:
      return null;
    default:
      return state;
  }
};
