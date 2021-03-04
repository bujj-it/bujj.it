import React from "react";
import { connect } from 'react-redux';

import { ADD_EXPENSE } from 'constants/actionTypes.js';
import MoneyValue  from 'components/elements/values/MoneyValue'
import Expense from 'components/elements/inputs/ExpenseInput'

import {
  expensesSelector,
  totalExpensesPerMonthSelector,
  areExpensesFilledInSelector
} from 'selectors/expensesSelectors'

const mapStateToProps = state => {
  return {
    expenses: expensesSelector(state),
    expenseTotal: totalExpensesPerMonthSelector(state),
    income: state.income,
    isInputComplete: areExpensesFilledInSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNewExpense: () => {
      dispatch({ type: ADD_EXPENSE })
    }
  }
}

const ExpensesInput = props => {
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
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesInput);
