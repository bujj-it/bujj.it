export const expensesSelector = state => {
  const expensesArray = Object.entries(state.expenses).map(([key, value]) => {
    return { id: key, name: value.name, value: (value.value ? parseInt(value.value, 10) : 0) };
  });
  return expensesArray;
};

export const totalExpensesPerMonthSelector = state => {
  const expensesArray = expensesSelector(state);
  return expensesArray.reduce((a, expense) => a + expense.value, 0);
};

export const areExpensesFilledInSelector = state => {
  return Object.values(state.expenses).every(value => !!value.name && !!value.value);
};
