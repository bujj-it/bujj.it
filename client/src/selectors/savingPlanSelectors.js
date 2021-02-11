import { totalExpensesPerMonthSelector } from './expensesSelectors'

const remainingPerMonthSelector = state => {
  return state.income - totalExpensesPerMonthSelector(state)
}

export const savingsPerMonthSelector = (state, savingPercentage = state.savingPercentage) => {
  return state.income * (savingPercentage / 100)
}

export const spendingPerWeekSelector = (state, savingPercentage = state.savingPercentage) => {
  const remainingMonies = remainingPerMonthSelector(state) - savingsPerMonthSelector(state, savingPercentage)
  return Math.floor((remainingMonies) / 4.34524)
}

export const timeToGoalSelector = (state, savingPercentage = state.savingPercentage) => {
  const savingsPerMonth = savingsPerMonthSelector(state, savingPercentage)
  if ( savingsPerMonth <= 0) {
    return {months: 0, days: 0}
  }
  const remainingTime = state.savingGoal.value / savingsPerMonth
  const months = Math.floor(remainingTime)
  const days = Math.round(30.44 * (remainingTime - months))
  return {months: months, days: days}
}

export const maxSavingPercentageSelector = state => {
  return Math.floor((remainingPerMonthSelector(state) / state.income) * 100)
}

export const maxSavingsPerMonthSelector = state => {
  
}

export const maxSpendingPerWeekSelector = state => {
  
}

export const maxTimeToGoalSelector = state => {
  
}