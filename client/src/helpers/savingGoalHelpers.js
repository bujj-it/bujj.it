export const savingsPerMonthHelper = (income, savingPercentage) => {
  return income * (savingPercentage / 100)
}

export const spendingPerWeekHelper = (remainingPerMonth, savingsPerMonth) => {
  return Math.floor((remainingPerMonth - savingsPerMonth) / 4.34524)
}


export const timeToGoalHelper = (savingGoal, savingPerMonth) => {
  const remainingTime = savingGoal / savingPerMonth
  const months = Math.floor(remainingTime)
  const days = Math.round(30 * (remainingTime - months))
  return {months: months, days: days}
}