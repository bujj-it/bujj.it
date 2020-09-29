const sessionsController = require('../controllers/sessions.controller');

module.exports = (app, db) => {
  app.post('/api/sessions', sessionsController.signin(db));
};
