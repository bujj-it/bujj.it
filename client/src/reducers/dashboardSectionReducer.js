import { VIEW_YOUR_BUDGET } from 'constants/actionTypes';
import { YOUR_BUDGET } from 'constants/dashboardSections.constants';

export default (state = YOUR_BUDGET, action) => {
  switch (action.type) {
    case VIEW_YOUR_BUDGET:
      return YOUR_BUDGET;
    default:
      return state;
  }
};
