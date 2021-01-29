export const expensesSelector = state => {
  const expensesArray = []
  for (const [key, value] of Object.entries(state.expenses)) {
    expensesArray.push({id: key, name: value.name, value: value.value})
  }
  return expensesArray
}

export const areExpensesFilledInSelector = state => {
  for (const value of Object.values(state.expenses)) {
    if (!value.name || !value.value) {
      return false
    }
  }
  return true
}