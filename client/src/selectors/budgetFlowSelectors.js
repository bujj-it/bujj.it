import {budgetFlowSections} from '../constants/budgetFlowSections'

export const isCurrentSectionSelector = (state, section) => {
  const currentSectionIndex = budgetFlowSections.indexOf(state.budgetFlow)
  const sectionIndex = budgetFlowSections.indexOf(section)
  return sectionIndex <= currentSectionIndex
}