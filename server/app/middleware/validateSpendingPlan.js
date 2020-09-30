const { body } = require('express-validator');

const expensesSchema = { name: 'string', value: 'number' };

const isExpensesKeysValid = (expenses) => expenses.every((expense) => Object.keys(expense).sort().every((key, index) => key === Object.keys(expensesSchema)[index]));

const isExpensesValuesValid = (expenses) => expenses.every((expense) => Object.keys(expensesSchema).every((key) => typeof expense[key] === expensesSchema[key]));

const validateExpenses = (expenses) => {
  if (!isExpensesKeysValid(expenses)) {
    throw new Error("Expenses format invalid, keys must be 'name' and 'value'!");
  }
  if (!isExpensesValuesValid(expenses)) {
    throw new Error("Expenses format invalid, values for 'name' must be of type string and 'value' of type integer!");
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
