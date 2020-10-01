const { body } = require('express-validator');
const processValidationErrors = require('./processValidationErrors');

const savingGoalSchema = ['name', 'value'];
const isSavingGoalKeysPresent = (savingGoal) => Object.keys(savingGoal).length === Object.keys(savingGoalSchema).length;

const validateSavingGoalKeys = (req, res, next) => {
  if (!isSavingGoalKeysPresent(req.body)) {
    return res.status(400).send({ message: 'Invalid saving goal format.' });
  }
  next();
};

const validateSavingGoalParams = [
  validateSavingGoalKeys,
  body('name')
    .exists().withMessage('name cannot be blank!')
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage('name can only be letters, numbers, and spaces!')
    .trim(),
  body('value')
    .exists().withMessage('value cannot be blank!')
    .isCurrency({
      allow_negatives: false,
    })
    .withMessage('value format invalid, must be integer or decimal currency!')
    .customSanitizer((value) => Number(value)),
  processValidationErrors,
];

module.exports = validateSavingGoalParams;
