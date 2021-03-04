import React from 'react';
import { connect } from 'react-redux';

import { isInputCompleteSelector } from 'selectors/inputSelectors';
import HomepageSection from 'components/composites/sectionWrappers/HomepageSection';
import BudgetFlowSection from 'components/composites/sectionWrappers/BudgetFlowSection';
import SavingGoalInput from 'components/elements/inputs/SavingGoalInput';

const currentBudgetFlowSection = 'SAVING_GOAL';

const mapStateToProps = state => ({
  isInputComplete: isInputCompleteSelector(state, 'savingGoal'),
});

const SavingGoal = props => (
  <HomepageSection sectionClass="saving-goal" budgetFlowSection={currentBudgetFlowSection}>
    <BudgetFlowSection
      sectionTitle="Add Saving Goal"
      previousButtonText="Back To Homepage"
      currentBudgetFlowSection={currentBudgetFlowSection}
      isInputComplete={props.isInputComplete}
    >
      <SavingGoalInput />

    </BudgetFlowSection>
  </HomepageSection>
);

export default connect(mapStateToProps)(SavingGoal);
