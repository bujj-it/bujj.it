const { body } = require('express-validator');
const processValidationErrors = require('./processValidationErrors');

const validateExpensesParams = [
  body('id')
    .exists().withMessage('id cannot be blank!')
    .not()
    .isEmpty()
    .withMessage('id cannot be blank!'),
  processValidationErrors,
];

module.exports = validateExpensesParams;
