export const savingsPerMonth = (income, savingPercentage) => {
  return income * (savingPercentage / 100)
}


export const spendingPerWeek = (remainingPerMonth, savingsPerMonth) => {
  return remainingPerMonth - savingsPerMonth
}


export const monthsToGoal = (savingGoal, savingPerMonth) => {
  const remainingTime = savingGoal / savingPerMonth
  const months = Math.floor(remainingTime)
  const days = Math.round(30 * (remainingTime - months))
  return {months: months, days: days}
}