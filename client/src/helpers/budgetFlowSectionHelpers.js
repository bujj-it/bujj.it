import budgetFlowSections from '../constants/budgetFlowSections';

export const nextBudgetFlowSectionHelper = currentSection => {
  const currentSectionIndex = budgetFlowSections.indexOf(currentSection);
  if (currentSectionIndex < 0) {
    throw (new Error(`nextBudgetFlowSectionHelper: budgetFlowSection: '${currentSection}' does not exist`));
  }
  if (currentSectionIndex === (budgetFlowSections.length - 1)) {
    return currentSection;
  }
  return budgetFlowSections[currentSectionIndex + 1];
};

export const previousBudgetFlowSectionHelper = currentSection => {
  const currentSectionIndex = budgetFlowSections.indexOf(currentSection);
  if (currentSectionIndex < 0) {
    throw (new Error(`nextBudgetFlowSectionHelper: budgetFlowSection: '${currentSection}' does not exist`));
  }
  if (currentSectionIndex === 0) {
    return currentSection;
  }
  return budgetFlowSections[currentSectionIndex - 1];
};
