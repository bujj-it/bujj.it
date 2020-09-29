module.exports = (app, db) => {
  const sessionController = require('../controllers/session.controller')(db);

  app.post('/api/session', sessionController.signin);

  app.delete('/api/session', sessionController.signout);
};
