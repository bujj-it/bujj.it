module.exports = (app, db) => {
  const validateUserLoginParams = require('app/middleware/validateUserLoginParams');
  const sessionController = require('app/controllers/session.controller')(db);

  app.post('/api/session', [
    validateUserLoginParams,
  ], sessionController.signin);

  app.delete('/api/session', sessionController.signout);
};
