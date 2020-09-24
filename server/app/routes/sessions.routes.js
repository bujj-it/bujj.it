const sessionsController = require("../controllers/sessions.controller");

module.exports = function (app, db) {
  app.post("/api/sessions", sessionsController.signin(db));
};
