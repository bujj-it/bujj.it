const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const usersController = require("../controllers/users.controller");

module.exports = function (app, db) {
  app.get("/api/users", [authJwt.verifyToken], usersController.userPage);

  app.post(
    "/api/users",
    [verifySignUp.checkDuplicateUsernameOrEmail(db)],
    usersController.signup(db)
  );
};
