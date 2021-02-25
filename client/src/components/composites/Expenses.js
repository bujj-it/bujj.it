import React from "react";
import { connect } from 'react-redux';

import ExpensesInput from 'components/elements/ExpensesInput'

import { areExpensesFilledInSelector } from 'selectors/expensesSelectors'
import HomepageSection from "components/elements/HomepageSection";
import BudgetFlowSection from 'components/elements/BudgetFlowSection'

const currentBudgetFlowSection = 'EXPENSES'

const mapStateToProps = state => {
  return {
    isInputComplete: areExpensesFilledInSelector(state)
  }
}

const Expenses = props => {
  return (
    <HomepageSection sectionClass='expenses' budgetFlowSection={currentBudgetFlowSection}>
      <BudgetFlowSection 
          sectionTitle={'Add Expenses'}
          currentBudgetFlowSection={currentBudgetFlowSection}
          isInputComplete={props.isInputComplete}>

        <ExpensesInput />
      </BudgetFlowSection>
    </HomepageSection>
  )
}

export default connect(mapStateToProps)(Expenses);
