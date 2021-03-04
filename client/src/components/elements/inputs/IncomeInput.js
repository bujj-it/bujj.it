import React from "react";
import { connect } from 'react-redux';

import { UPDATE_INCOME } from 'constants/actionTypes'

const currentBudgetFlowSection = 'INCOME'

const mapStateToProps = state => {
  return {
    income: state.income ? state.income / 100 : ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncomeChange: event => {
      dispatch({ type: UPDATE_INCOME, payload: event.target.value })
    }
  }
}

const IncomeInput = props => {

  return (
    <div className='input-container'>
      <label className='label'>Your monthly income</label>
      <div className='value'>
        <span className='denominator'>£</span>
        <input type="number"
            name="income-value"
            min="0"
            step="0.01"
            placeholder='1000'
            required
            value={props.income}
            onChange={props.onIncomeChange} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeInput);
