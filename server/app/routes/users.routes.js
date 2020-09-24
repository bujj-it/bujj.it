const authJwt = require("../middleware/authJwt");
const verifySignUp = require("../middleware/verifySignup");
const usersController = require("../controllers/users.controller");

module.exports = function (app, db) {
  app.get("/api/users", authJwt.verifyToken, usersController.usersPage);

  app.post(
    "/api/users",
    verifySignUp.checkDuplicateUsernameOrEmail(db),
    usersController.signup(db)
  );
};
