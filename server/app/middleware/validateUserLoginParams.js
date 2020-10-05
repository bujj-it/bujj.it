const { body } = require('express-validator');
const processValidationErrors = require('app/middleware/processValidationErrors');

const validateUserLoginParams = [
  body('user')
    .not().isEmpty().withMessage('User field cannot be blank!'),
  body('password')
    .not().isEmpty().withMessage('Password field cannot be blank!'),
  processValidationErrors,
];

module.exports = validateUserLoginParams;
