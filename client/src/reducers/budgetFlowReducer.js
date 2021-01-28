import { NEXT_SECTION } from '../constants/actionTypes.js';

import { budgetFlowSections } from '../constants/budgetFlowSections'

export default (state = budgetFlowSections[0], action) => {
  switch (action.type) {
    case NEXT_SECTION:
      return action.payload
    default:
      return state
  }
}