import React from 'react';
import { connect } from 'react-redux';

import { UPDATE_INCOME } from 'constants/actionTypes';

const mapStateToProps = state => ({
  income: state.income ? state.income / 100 : '',
});

const mapDispatchToProps = dispatch => ({
  onIncomeChange: event => {
    dispatch({ type: UPDATE_INCOME, payload: event.target.value });
  },
});

const IncomeInput = props => (
  <div className="input-container">
    <div className="label">Your monthly income</div>
    <div className="value">
      <span className="denominator">£</span>
      <input
        type="number"
        id="income-value"
        name="income-value"
        min="0"
        step="0.01"
        placeholder="1000"
        required
        value={props.income}
        onChange={props.onIncomeChange}
      />
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(IncomeInput);
