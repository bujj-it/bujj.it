import React from "react";
import { connect } from 'react-redux';

import SectionNavigationButtons from 'components/composites/SectionNavigationButtons'
import Expense from 'components/elements/Expense';
import { MoneyValue }  from 'components/elements/MoneyValue'
import { ADD_EXPENSE } from 'constants/actionTypes.js';
import {
  expensesSelector,
  areExpensesFilledInSelector,
  totalExpensesPerMonthSelector
} from 'selectors/expensesSelectors'
import HomepageSection from "components/elements/HomepageSection";

const currentBudgetFlowSection = 'EXPENSES'

const mapStateToProps = state => {
  return {
    expenses: expensesSelector(state),
    isInputComplete: areExpensesFilledInSelector(state),
    expenseTotal: totalExpensesPerMonthSelector(state),
    income: state.income
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

  const expenseComponents = props.expenses.map(expense => <Expense expense={expense} key={expense.id}/>)

  const isExpensesExceedingIncome = props.expenseTotal >= props.income
  const warningMessageText = (props.expenseTotal > props.income ? 
    `Your expenses exceed your income by £${((Math.abs(props.income - props.expenseTotal))/100).toFixed(2).toString()}` : 
    `Your expenses equal your income`
  )
  const warningMessage = (
    <div className={`warning-message ${isExpensesExceedingIncome ? 'visible' : ''}`}>
      {warningMessageText}
      <br/><br/>
      Reduce your expenses or increase your income to create a buget and save!
    </div>
  )

  return (
    <HomepageSection sectionClass='expenses' budgetFlowSection={currentBudgetFlowSection}>
      <h2>EXPENSES</h2>

      <div className='expenses-container'>
        <div className='expenses'>
          {expenseComponents}
          <button className='expense-add-button' 
              onClick={props.onAddNewExpense} 
              disabled={!props.isInputComplete}>
            + Add Expense
          </button>

          <div className='expenses-total'>
            Total: <MoneyValue value={props.expenseTotal} />
          </div>          
        </div>

        {warningMessage}
      </div>

      <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
          previousButtonText={'Previous Section'}
          nextButtonText={'Next Section'}
          isInputComplete={props.isInputComplete}/>
    </HomepageSection>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);