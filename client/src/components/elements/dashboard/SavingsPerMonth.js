import React from 'react';
import { connect } from 'react-redux';

import { savingsPerMonthSelector } from 'selectors/savingPlanSelectors';
import MoneyValue from 'components/elements/values/MoneyValue';

const mapStateToProps = state => ({
  savingsPerMonth: savingsPerMonthSelector(state),
});

const SavingsPerMonth = props => (
  <div className="input-container dashboard-pane">
    <p className="title">Savings Per Month</p>
    <MoneyValue value={props.savingsPerMonth} />
  </div>
);

export default connect(mapStateToProps)(SavingsPerMonth);
