const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = function(app, db) {
  app.get(
    "/api/user",
    [authJwt.verifyToken],
    userController.userPage
  );
  
  app.post(
    "/api/user",
    [
      verifySignUp.checkDuplicateUsernameOrEmail(db),
    ],
    userController.signup(db)
  );
};