import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from 'components/elements/ActionButton';
import Expense from 'components/elements/Expense';
import scrollToSectionEffect from 'components/effects/scrollToSectionEffect'
import { ADD_EXPENSE } from 'constants/actionTypes.js';
import { isCurrentSectionSelector, isSectionVisibleSelector } from 'selectors/budgetFlowSelectors'
import {
  expensesSelector,
  areExpensesFilledInSelector,
  totalExpensesPerMonthSelector
} from 'selectors/expensesSelectors'


const currentBudgetFlowSection = 'EXPENSES'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    isSectionVisible: isSectionVisibleSelector(state, currentBudgetFlowSection),
    expenses: expensesSelector(state),
    areExpensesFilledIn: areExpensesFilledInSelector(state),
    expenseTotal: totalExpensesPerMonthSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNewExpense: () => {
      dispatch({ type: ADD_EXPENSE })
    }
  }
}


const Expenses = props => {

  const sectionRef = useRef(null);
  scrollToSectionEffect(sectionRef, props.isCurrentSection)

  const visible = props.isSectionVisible ? 'visible' : ''
  const expenseComponents = props.expenses.map(expense => <Expense expense={expense} key={expense.id}/>)

  return (
    
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane expenses'>

        <h2>EXPENSES</h2>

        <div className='expenses-container'>
          {expenseComponents}
          <button className='expense-add-button' 
              onClick={props.onAddNewExpense} 
              disabled={!props.areExpensesFilledIn}>
            + Add Expense
          </button>

          <div className='expenses-total'>
            Total: {props.expenseTotal}
          </div>
        </div>

        

        <div className='button-container'>
          <ActionButton 
            text='Next Section (nearly done!)' 
            currentSection={currentBudgetFlowSection}
            disabled={!props.areExpensesFilledIn}/>
        </div>

      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);