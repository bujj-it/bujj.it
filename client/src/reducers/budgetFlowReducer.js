import { NEXT_SECTION } from '../constants/actionTypes.js';
import nextBudgetFlowSectionHelper from '../helpers/nextBudgetFlowSectionHelper' 
import { budgetFlowSections } from '../constants/budgetFlowSections'

export default (state = budgetFlowSections[0], action) => {
// export default (state = 'SAVING_PERCENTAGE', action) => {
  switch (action.type) {
    case NEXT_SECTION:
      const nextBudgetFlowSection = nextBudgetFlowSectionHelper(action.payload)
      return nextBudgetFlowSection
    default:
      return state
  }
}