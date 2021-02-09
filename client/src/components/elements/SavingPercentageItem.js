import React from "react";
import { connect } from 'react-redux';

import { remainingPerMonthSelector } from 'selectors/savingPlanSelectors'
import {savingsPerMonthHelper, spendingPerWeekHelper, timeToGoalHelper} from 'helpers/savingGoalHelpers'

const mapStateToProps = state => {
  return {
    income: state.income,
    remainingPerMonth: remainingPerMonthSelector(state),
    savingGoal: state.savingGoal.value
  }
}

const SavingPercentageItem = props => {

  const savingsPerMonth = savingsPerMonthHelper(props.income, props.savingPercentage)
  const spendingPerWeek = spendingPerWeekHelper(props.remainingPerMonth, savingsPerMonth)
  const timeToGoal = timeToGoalHelper(props.savingGoal, savingsPerMonth)

  return (
    <div className='saving-percentage'>
      Percentage: {props.savingPercentage}%
      Savings per Month: £{(savingsPerMonth/100).toFixed(2).toString()}
      Spending per Week: £{(spendingPerWeek/100).toFixed(2).toString()}
      Time to Goal: {timeToGoal.months.toString()} Months and {timeToGoal.days.toString()} Days
    </div>
  )
}

export default connect(mapStateToProps)(SavingPercentageItem);