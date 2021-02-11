import { totalExpensesPerMonthSelector } from './expensesSelectors'
import { DAYS_PER_MONTH, WEEKS_PER_MONTH } from 'constants/time.constants'

export const remainingPerMonthSelector = state => {
  return state.income - totalExpensesPerMonthSelector(state)
}

export const savingsPerMonthSelector = (state, savingPercentage = state.savingPercentage) => {
  return Math.trunc(state.income * (savingPercentage / 100))
}

export const spendingPerWeekSelector = (state, savingPercentage = state.savingPercentage) => {
  const remainingMonies = remainingPerMonthSelector(state) - savingsPerMonthSelector(state, savingPercentage)
  return Math.trunc((remainingMonies) / WEEKS_PER_MONTH)
}

export const timeToGoalSelector = (state, savingPercentage = state.savingPercentage) => {
  const savingsPerMonth = savingsPerMonthSelector(state, savingPercentage)
  if ( savingsPerMonth <= 0) {
    return {months: 0, days: 0}
  }
  const remainingTime = state.savingGoal.value / savingsPerMonth
  const months = Math.floor(remainingTime)
  const days = Math.round(DAYS_PER_MONTH * (remainingTime - months))
  return {months: months, days: days}
}

export const maxSavingPercentageSelector = state => {
  return Math.floor((remainingPerMonthSelector(state) / state.income) * 100)
}