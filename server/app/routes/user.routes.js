const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = function(app, db) {
  app.get(
    "/api/user",
    [authJwt.verifyToken(db)],
    userController.userPage
  );
  
  app.post(
    "/api/user",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    userController.signup
  );
};