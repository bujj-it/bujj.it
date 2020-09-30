const { body } = require('express-validator');

const isExpensesKeysValid = (expenses) => {
  const validKeys = ['name', 'value'];
  return expenses.every((expense) => Object.keys(expense).sort().every((key, index) => key === validKeys[index]));
};

const validateExpenses = (expenses) => {
  if (!isExpensesKeysValid(expenses)) {
    throw new Error("Expenses format invalid, keys must be 'name' and 'value'!");
  }
  return true;
};

const validateSpendingPlanParams = [
  body('income')
    .not().isEmpty().withMessage('Income cannot be blank!')
    .isCurrency({
      allow_negatives: false,
    })
    .withMessage('Income format invalid, must be integer or decimal currency!')
    .customSanitizer((value) => Number(value)),
  body('expenses')
    .not().isEmpty().withMessage('Expenses cannot be blank!')
    .custom(validateExpenses),
];

module.exports = validateSpendingPlanParams;
