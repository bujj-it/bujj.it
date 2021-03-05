import { UPDATE_DASHBOARD_SECTION } from 'constants/actionTypes';
import { YOUR_BUDGET } from 'constants/dashboardSections.constants';

export default (state = YOUR_BUDGET, action) => {
  switch (action.type) {
    case UPDATE_DASHBOARD_SECTION:
      return action.payload;
    default:
      return state;
  }
};
