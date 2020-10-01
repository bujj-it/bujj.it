const validator = require('validator');

const expenseSchema = {
  id: {
    test: (value) => /\w+/.test(value),
    value: 'string',
  },
  name: {
    test: (value) => /\w+/.test(value),
    value: 'string',
  },
  value: {
    test: (value) => validator.isCurrency(String(value, { allow_negatives: false })),
    value: 'number (currency)',
  },
};

const isExpenseKeysPresent = (expense) => Object.keys(expense).length === Object.keys(expenseSchema).length;
const isExpensesValuesValid = (expense) => Object.keys(expenseSchema).every((key) => {
  try {
    return expenseSchema[key].test(expense[key]);
  } catch {
    return false;
  }
});

const generateSchemaResponse = () => {
  const response = {};
  Object.keys(expenseSchema).forEach((key) => {
    response[key] = expenseSchema[key].value;
  });
  return JSON.stringify(response);
};

const validateExpenseKey = (req, res, next) => {
  if (!isExpenseKeysPresent(req.body) || !isExpensesValuesValid(req.body)) {
    return res.status(400).send({ message: `Invalid expense format, format must match: ${generateSchemaResponse()}` });
  }
  next();
};

const validateExpensesParams = [
  validateExpenseKey,
];

module.exports = validateExpensesParams;
