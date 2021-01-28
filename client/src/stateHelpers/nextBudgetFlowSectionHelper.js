import {budgetFlowSections} from '../constants/budgetFlowSections'

const nextBudgetFlowSectionHelper = currentSection => {
  const currentSectionIndex = budgetFlowSections.indexOf(currentSection)
  if (!!currentSectionIndex) {
    throw(new Error('nextBudgetFlowSectionHelper: bugetFlowSection does not exist'))
  }
  if (currentSectionIndex === (budgetFlowSections.length - 1)) {
    return currentSection
  } else {
    return budgetFlowSections[currentSectionIndex + 1]
  }
}

export default nextBudgetFlowSectionHelper