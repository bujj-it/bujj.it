import React from "react";
import { connect } from 'react-redux';
import nextBudgetFlowSectionHelper from '../../stateHelpers/nextBudgetFlowSectionHelper' 

import {isCurrentSectionSelector} from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'SAVINGS_GOAL'
const nextBudgetFlowSection = nextBudgetFlowSectionHelper(currentBudgetFlowSection)

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection)
  }
}

const SavingsGoal = props => {

  const savingsGoal = props.isCurrentSection ? (
    <section className='section-container savings-goal-container'>
      ENTER SAVINGS GOAL
    </section>
  ) : ''

  return savingsGoal
}

export default connect(mapStateToProps)(SavingsGoal);