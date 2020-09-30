const validateUser = require('../middleware/validateUser');
const processValidationErrors = require('../middleware/processValidationErrors');

module.exports = (app, db) => {
  const sessionController = require('../controllers/session.controller')(db);

  app.post('/api/session', [
    validateUser.validateLoginParams,
    processValidationErrors,
  ], sessionController.signin);

  app.delete('/api/session', sessionController.signout);
};
