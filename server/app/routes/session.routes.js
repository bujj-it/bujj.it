const validateUser = require('../middleware/validateUser');

module.exports = (app, db) => {
  const sessionController = require('../controllers/session.controller')(db);

  app.post('/api/session', [
    validateUser.validateLoginParams,
    validateUser.processValidationErrors,
  ], sessionController.signin);

  app.delete('/api/session', sessionController.signout);
};
