const { body } = require('express-validator');
const validator = require('validator');

const expensesSchema = { name: 'string', value: 'number' };

const expensesFormat = {
  name: (value) => /\w+/.test(value),
  value: (value) => validator.isCurrency(String(value, { allow_negatives: false })),
};

const isExpensesKeysValid = (expenses) => expenses.every((expense) => Object.keys(expense).sort().every((key, index) => key === Object.keys(expensesSchema)[index]));

const isExpensesValuesTypeValid = (expenses) => expenses.every((expense) => Object.keys(expensesSchema).every((key) => typeof expense[key] === expensesSchema[key]));

const isExpensesValuesValid = (expenses) => expenses.every((expense) => Object.keys(expensesFormat).every((key) => expensesFormat[key](expense[key])));

const validateExpenses = (expenses) => {
  if (!isExpensesKeysValid(expenses)) {
    throw new Error("Expenses format invalid, keys must be 'name' and 'value'!");
  }
  if (!isExpensesValuesTypeValid(expenses)) {
    throw new Error("Expenses types invalid, values for 'name' must be string and 'value' number!");
  }
  if (!isExpensesValuesValid(expenses)) {
    throw new Error("Expenses format invalid, values for 'name' must be a-zA-Z0-9_ and 'value' currency!");
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
