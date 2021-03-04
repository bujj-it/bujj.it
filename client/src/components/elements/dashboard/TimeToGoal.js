import React from 'react';
import { connect } from 'react-redux';

import { timeToGoalSelector } from 'selectors/savingPlanSelectors';
import DurationValue from 'components/elements/values/DurationValue';

const mapStateToProps = state => ({
  timeToGoal: timeToGoalSelector(state),
});

const TimeToGoal = props => (
  <div className="input-container dashboard-pane">
    <p className="title">Time to Goal</p>
    <DurationValue duration={props.timeToGoal} />
  </div>
);

export default connect(mapStateToProps)(TimeToGoal);
