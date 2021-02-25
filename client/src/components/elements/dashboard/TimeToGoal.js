import React from "react";
import { connect } from 'react-redux';

import { timeToGoalSelector } from 'selectors/savingPlanSelectors'
import DurationValue from 'components/elements/DurationValue'

const mapStateToProps = state => {
  return {
    timeToGoal: timeToGoalSelector(state)
  }
}

const TimeToGoal = props => {

  return (
    <div className='input-container dashboard-pane'>
      <p className='title'>Time to Goal</p>
      <DurationValue duration={props.timeToGoal}/>
    </div>
  )
}

export default connect(mapStateToProps)(TimeToGoal);
