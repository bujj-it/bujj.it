export const expensesSelector = state => {
  const expensesArray = []
  for (const [key, value] of Object.entries(state.expenses)) {
    expensesArray.push({id: key, name: value.name, value: (value.value ? parseInt(value.value, 10) : 0)})
  }
  return expensesArray
}

export const totalExpensesPerMonthSelector = state => {
  const expensesArray = expensesSelector(state)
  return expensesArray.reduce((a, expense) => a + expense.value, 0)
}

export const areExpensesFilledInSelector = state => {
  for (const value of Object.values(state.expenses)) {
    if (!value.name || !value.value) {
      return false
    }
  }
  return true
}