const { body } = require('express-validator');

const validateSpendingPlanParams = [
  body('income')
    .not().isEmpty().withMessage('Income cannot be blank!')
    .isCurrency({ 
      allow_negatives: false 
    }).withMessage('Income format invalid!')
    .customSanitizer((value) => Number(value)),
  body('expenses')
    .not().isEmpty().withMessage('Expenses cannot be blank!')
];

module.exports = validateSpendingPlanParams;
