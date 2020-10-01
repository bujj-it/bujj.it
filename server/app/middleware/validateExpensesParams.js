const expenseSchema = { id: 'string', name: 'string', value: 'number' };

// const expensesFormat = {
//   id: (value) => /\w+/.test(value),
//   name: (value) => /\w+/.test(value),
//   value: (value) => validator.isCurrency(String(value, { allow_negatives: false })),
// };

const isExpenseKeysPresent = (expense) => Object.keys(expense).length === Object.keys(expenseSchema).length
const isExpenseKeyNamesValid = (expense) => Object.keys(expense).sort().every((key, index) => key === Object.keys(expenseSchema)[index]);

const validateExpense = (req, res, next) => {
  if (!isExpenseKeyNamesValid(req.body) || !isExpenseKeysPresent(req.body)) {
    return res.status(400).send({ message: `Invalid expense format, format must match: ${JSON.stringify(expenseSchema)}` });
  }
  next()
}

const validateExpensesParams = [
  validateExpense
];

module.exports = validateExpensesParams;
