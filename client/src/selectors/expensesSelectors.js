export const expensesSelector = state => {
  const expensesArray = []
  for (const [key, value] of Object.entries(state.expenses)) {
    expensesArray.push({id: key, name: value.name, value: (value.value ? parseFloat(value.value, 10) / 100 : 0)})
  }
  return expensesArray
}

export const totalExpensesPerMonthSelector = state => {
  const expensesArray = expensesSelector(state)
  const total = expensesArray.reduce((a, expense) => a + expense.value, 0)
  if ((total * 100) % 100 === 0 ) {
    return total
  } else {
    return total.toFixed(2)
  }
}

export const areExpensesFilledInSelector = state => {
  for (const value of Object.values(state.expenses)) {
    if (!value.name || !value.value) {
      return false
    }
  }
  return true
}