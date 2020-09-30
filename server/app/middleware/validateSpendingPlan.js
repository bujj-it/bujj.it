const { body } = require('express-validator');

const validateSpendingPlanParams = [
  body('income')
    .not().isEmpty().withMessage('Income cannot be blank!')
    .isCurrency({ allow_negatives: false })
    .withMessage('Income format invalid!')
    .customSanitizer((value) => Number(value)),
];

module.exports = validateSpendingPlanParams;
