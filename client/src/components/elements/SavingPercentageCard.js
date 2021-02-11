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
    isCardSelected: state.savingPercentage === ownProps.savingPercentage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onItemClick: () => {
      dispatch({ 
        type: UPDATE_SAVING_PERCENTAGE,
        payload: ownProps.savingPercentage
      })
    }
  }
}

const SavingPercentageCard = props => {

  const isCardAvailable = props.spendingPerWeek >= 0

  const cardSelectedClass = props.isCardSelected ? 'selected' : ''
  const cardAvailableClass = isCardAvailable ? '' : 'not-available'

  return (
    <button className={`saving-percentage-card ${cardSelectedClass} ${cardAvailableClass}`} onClick={props.onItemClick} disabled={props.isCardSelected || !isCardAvailable}>
      <div className='percentage flex-center'>
        {props.savingPercentage} %
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
    </button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingPercentageCard);