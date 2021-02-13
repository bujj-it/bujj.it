import React from "react";
import { connect } from 'react-redux';

import {isInputCompleteSelector} from 'selectors/inputSelectors'
import HomepageSection from "components/elements/HomepageSection";
import BudgetFlowSection from 'components/elements/BudgetFlowSection'
import IncomeInput from 'components/elements/IncomeInput';

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
