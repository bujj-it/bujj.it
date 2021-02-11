import {budgetFlowSections} from '../constants/budgetFlowSections'

export const isCurrentSectionSelector = (state, section) => {
  const currentSectionIndex = budgetFlowSections.indexOf(state.budgetFlow)
  const sectionIndex = budgetFlowSections.indexOf(section)
  return sectionIndex === currentSectionIndex
}

export const isSectionVisibleSelector = (state, section) => {
  const currentSectionIndex = budgetFlowSections.indexOf(state.budgetFlow)
  const sectionIndex = budgetFlowSections.indexOf(section)
  return sectionIndex <= currentSectionIndex
}

export const isInitialSectionSelector = state => {
  return budgetFlowSections.indexOf(state.budgetFlow) === 0
}