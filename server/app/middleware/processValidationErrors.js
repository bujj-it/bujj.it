const { validationResult } = require('express-validator');

const processValidationErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessages = {};
    for (let i = 0; i < result.errors.length; i += 1) {
      if (!errorMessages[result.errors[i].param]) {
        errorMessages[result.errors[i].param] = result.errors[i].msg;
      }
    }
    return res.status(400).json({ message: errorMessages });
  }
  next();
};

module.exports = processValidationErrors;
