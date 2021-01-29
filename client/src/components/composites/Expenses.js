import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from 'components/elements/ActionButton';
import scrollToSectionEffect from 'components/effects/scrollToSectionEffect'
import { isCurrentSectionSelector } from 'selectors/budgetFlowSelectors'
import {expensesSelector, areExpensesFilledInSelector} from 'selectors/expensesSelectors'
import { ADD_EXPENSE } from 'constants/actionTypes.js';
import Expense from 'components/elements/Expense';

const currentBudgetFlowSection = 'EXPENSES'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    expenses: expensesSelector(state),
    areExpensesFilledIn: areExpensesFilledInSelector(state)
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
  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''
  const expenseComponents = props.expenses.map(expense => <Expense expense={expense} key={expense.id}/>)
  const expenseTotal=  props.expenses.reduce((a, expense) => a + (expense.value ? parseInt(expense.value, 10) : 0), 0)

  return (
    
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane'>

        <h2>EXPENSES</h2>

        <div className='expenses-container'>
          {expenseComponents}
          <button className='expense-add-button' 
              onClick={props.onAddNewExpense} 
              disabled={!props.areExpensesFilledIn}>
            + Add Expense
          </button>

          <div className='expenses-total'>
            Total: {expenseTotal}
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