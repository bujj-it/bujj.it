import React from 'react';
import { connect } from 'react-redux';

import { spendingPerWeekSelector } from 'selectors/savingPlanSelectors';
import MoneyValue from 'components/elements/values/MoneyValue';

const mapStateToProps = state => ({
  spendingPerWeek: spendingPerWeekSelector(state),
});

const SavingsPerMonth = props => (
  <div className="input-container dashboard-pane">
    <p className="title">Weekly Beer Fund</p>
    <MoneyValue value={props.spendingPerWeek} />
  </div>
);

export default connect(mapStateToProps)(SavingsPerMonth);
