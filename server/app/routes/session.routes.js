module.exports = (app, db) => {
  const validateUserLoginParams = require('../middleware/validateUserLoginParams');
  const sessionController = require('../controllers/session.controller')(db);

  app.post('/api/session', [
    validateUserLoginParams,
  ], sessionController.signin);

  app.delete('/api/session', sessionController.signout);
};
