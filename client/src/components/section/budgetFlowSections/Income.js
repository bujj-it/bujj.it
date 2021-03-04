import React from "react";
import { connect } from 'react-redux';

import {isInputCompleteSelector} from 'selectors/inputSelectors'
import HomepageSection from "components/composites/sectionWrappers/HomepageSection";
import BudgetFlowSection from 'components/composites/sectionWrappers/BudgetFlowSection'
import IncomeInput from 'components/elements/inputs/IncomeInput';

const currentBudgetFlowSection = 'INCOME'

const mapStateToProps = state => {
  return {
    isInputComplete: isInputCompleteSelector(state, 'income')
  }
}

const Income = props => {

  return (
    <HomepageSection sectionClass='income' budgetFlowSection={currentBudgetFlowSection}>
      <BudgetFlowSection 
          sectionTitle={'Enter Your Income'}
          currentBudgetFlowSection={currentBudgetFlowSection}
          isInputComplete={props.isInputComplete}>

        <IncomeInput />

      </BudgetFlowSection>
    </HomepageSection>
  )
}

export default connect(mapStateToProps)(Income);
