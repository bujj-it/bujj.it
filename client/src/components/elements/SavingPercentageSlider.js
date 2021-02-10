import React from "react";
import { connect } from 'react-redux';

import { MoneyValue }  from 'components/elements/MoneyValue'
import { DurationValue } from 'components/elements/DurationValue'
import { 
  savingsPerMonthSelector,
  spendingPerWeekSelector,
  timeToGoalSelector
} from 'selectors/savingPlanSelectors'
import { UPDATE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

const mapStateToProps = (state, ownProps) => {
  return {
    savingsPerMonth: savingsPerMonthSelector(state, ownProps.savingPercentage),
    spendingPerWeek: spendingPerWeekSelector(state, ownProps.savingPercentage),
    timeToGoal: timeToGoalSelector(state, ownProps.savingPercentage),
    isCardSelected: state.savingPercentage === ownProps.savingPercentage,
    savingPercentage: state.savingPercentage !== null ? state.savingPercentage : 0
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateSavingPercentage: event => {
      dispatch({ 
        type: UPDATE_SAVING_PERCENTAGE,
        payload: event.target.value
      })
    }
  }
}

const SavingPercentageItem = props => {

  return (
    <div className='saving-percentage-card slider selected'>
      <div className='percentage flex-center'>
        {props.savingPercentage} %
      </div>
      <div className='value slider-section flex-center'>
        <input type="range" min="0" max="100" value={props.savingPercentage} className="slider-input" onChange={props.updateSavingPercentage} />
      </div>
      <div className='heading half-width'>
        Savings per Month
      </div>
      <div className='heading half-width'>
        Spending per Week
      </div>
      <div className='value half-width'>
        <MoneyValue value={props.savingsPerMonth} />
      </div>
      <div className='value half-width'>
        <MoneyValue value={props.spendingPerWeek} />
      </div>
      <div className='heading'>
        Time to Goal
      </div>
      <div className='value'>
        <DurationValue duration={props.timeToGoal}/>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingPercentageItem);