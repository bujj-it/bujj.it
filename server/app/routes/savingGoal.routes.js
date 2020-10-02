const validateSession = require('../middleware/validateSession');
const validateSavingGoalParams = require('../middleware/validateSavingGoalParams');

module.exports = (app, db) => {
  const validateUser = require('../middleware/validateUser')(db);
  const verifySessionToken = validateSession.verifySessionToken(db);
  const savingGoalController = require('../controllers/savingGoal.controller')(db);

  app.post('/api/users/:userId/spending-plan/saving-goal', [
    verifySessionToken,
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
    validateSavingGoalParams,
  ], savingGoalController.overwrite);

  app.put('/api/users/:userId/spending-plan/saving-goal', [
    verifySessionToken,
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
    validateSavingGoalParams,
  ], savingGoalController.overwrite);

  app.delete('/api/users/:userId/spending-plan/saving-goal', [
    verifySessionToken,
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
  ], savingGoalController.destroy);
};
