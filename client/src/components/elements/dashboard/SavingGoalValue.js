import React from 'react';
import { connect } from 'react-redux';

import MoneyValue from 'components/elements/values/MoneyValue';

const mapStateToProps = state => ({
  savingGoalName: state.savingGoal.name,
  savingGoalValue: state.savingGoal.value,
});

const SavingGoalValue = props => (
  <>
    <span className="goal-name">
      {props.savingGoalName}
    </span>
    <span className="goal-value">
      <MoneyValue value={props.savingGoalValue} />
    </span>
  </>
);

export default connect(mapStateToProps)(SavingGoalValue);
