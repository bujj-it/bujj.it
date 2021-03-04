import { NEXT_SECTION, PREVIOUS_SECTION } from 'constants/actionTypes';
import { nextBudgetFlowSectionHelper, previousBudgetFlowSectionHelper } from '../helpers/budgetFlowSectionHelpers';
import budgetFlowSections from '../constants/budgetFlowSections';

export default (state = budgetFlowSections[0], action) => {
  switch (action.type) {
    case NEXT_SECTION:
      return nextBudgetFlowSectionHelper(action.payload);
    case PREVIOUS_SECTION:
      return previousBudgetFlowSectionHelper(action.payload);
    default:
      return state;
  }
};
