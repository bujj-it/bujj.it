import React from 'react';
import { connect } from 'react-redux';

import MoneyValue from 'components/elements/values/MoneyValue';
import DurationValue from 'components/elements/values/DurationValue';
import {
  savingsPerMonthSelector,
  spendingPerWeekSelector,
  timeToGoalSelector,
  maxSavingPercentageSelector,
  sliderSavingPercentageSelector,
} from 'selectors/savingPlanSelectors';
import { UPDATE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

const mapStateToProps = state => ({
  savingsPerMonth: savingsPerMonthSelector(state),
  spendingPerWeek: spendingPerWeekSelector(state),
  timeToGoal: timeToGoalSelector(state),
  savingPercentage: sliderSavingPercentageSelector(state),
  maxSavingPercentage: maxSavingPercentageSelector(state),
});

const mapDispatchToProps = dispatch => ({
  updateSavingPercentage: event => {
    dispatch({
      type: UPDATE_SAVING_PERCENTAGE,
      payload: parseInt(event.target.value, 10),
    });
  },
});

const SavingPercentageItem = props => (
  <div className="saving-percentage-card slider selected">
    <div className="percentage flex-center">
      {props.savingPercentage}
      {' '}
      %
    </div>
    <div className="value slider-section flex-center">
      <input
        type="range"
        min="0"
        max={props.maxSavingPercentage}
        step="1"
        value={props.savingPercentage}
        className="slider-input"
        onChange={props.updateSavingPercentage}
      />
    </div>
    <div className="heading half-width">
      Savings per Month
    </div>
    <div className="heading half-width">
      Spending per Week
    </div>
    <div className="value half-width">
      <MoneyValue value={props.savingsPerMonth} />
    </div>
    <div className="value half-width">
      <MoneyValue value={props.spendingPerWeek} />
    </div>
    <div className="heading">
      Time to Goal
    </div>
    <div className="value">
      <DurationValue duration={props.timeToGoal} />
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SavingPercentageItem);
