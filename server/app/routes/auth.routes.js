const authController = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post("/api/auth", authController.signin);
};