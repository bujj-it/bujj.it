import React from "react";
import { connect } from 'react-redux';

import { UPDATE_EXPENSE, REMOVE_EXPENSE } from 'constants/actionTypes.js';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onExpenseNameChange: event => {
      dispatch({ 
        type: UPDATE_EXPENSE, 
        payload: {
          ...ownProps.expense,
          name: event.target.value
        }
      })
    },
    onExpenseValueChange: event => {
      dispatch({ 
        type: UPDATE_EXPENSE, 
        payload: {
          ...ownProps.expense,
          value: event.target.value
        }
      })
    },
    onRemoveExpense: () => {
      dispatch({type: REMOVE_EXPENSE, payload: ownProps.expense.id})
    }
  }
}

const Expense = props => {

  return (
    <div className='input-container expense'>
      <label className='label expense-name-label'></label>
      <div className='name expense-name'>
        <input type="text" 
            name="expense-name" 
            placeholder='Rent, Phone Bill, etc.' 
            required 
            value={props.ExpenseName} 
            onChange={props.onExpenseNameChange}/>
      </div>
      <div className='value expense-value'>
        <span className='denominator'>£</span>
        <input type="number" 
            name="expense-value" 
            min="0" 
            step="0.01" 
            placeholder='1000' 
            required 
            value={props.ExpenseValue} 
            onChange={props.onExpenseValueChange}/>
      </div>
      <button onClick={props.onRemoveExpense} className='expense-remove'>X</button>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Expense);