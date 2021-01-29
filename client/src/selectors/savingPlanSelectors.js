import { totalExpensesPerMonthSelector } from 'selectors/expensesSelectors'

export const remainingPerMonthSelector = state => {
  const incomePerMonth = state.income
  const totalExpensesPerMonth = totalExpensesPerMonthSelector(state)
  return incomePerMonth - totalExpensesPerMonth
}