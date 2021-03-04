import React from 'react';
import { connect } from 'react-redux';

import { UPDATE_SAVING_GOAL_NAME, UPDATE_SAVING_GOAL_VALUE } from 'constants/actionTypes.js';

const mapStateToProps = state => ({
  savingGoalName: state.savingGoal.name,
  savingGoalValue: state.savingGoal.value ? state.savingGoal.value / 100 : '',
});

const mapDispatchToProps = dispatch => ({
  onSavingGoalNameChange: event => {
    dispatch({ type: UPDATE_SAVING_GOAL_NAME, payload: event.target.value });
  },
  onSavingGoalValueChange: event => {
    dispatch({ type: UPDATE_SAVING_GOAL_VALUE, payload: event.target.value });
  },
});

const SavingGoalInput = props => (
  <div className="input-container dashboard-pane">
    <p className="title">Saving Goal</p>
    <div className="name">
      <input
        type="text"
        name="saving-goal-name"
        placeholder="Emergency Fund"
        required
        value={props.savingGoalName}
        onChange={props.onSavingGoalNameChange}
      />
    </div>
    <div className="value">
      <span className="denominator">£</span>
      <input
        type="number"
        name="saving-goal-value"
        min="0"
        step="0.01"
        placeholder="1000"
        required
        value={props.savingGoalValue}
        onChange={props.onSavingGoalValueChange}
      />
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SavingGoalInput);
