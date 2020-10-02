module.exports = (app, db) => {
  const validateSavingGoalParams = require('../middleware/validateSavingGoalParams');
  const { verifySessionToken, validateUserAuthorizedForResource } = require('../middleware/validateUserAuthorization')(db);
  const validateRequestedUser = require('../middleware/validateRequestedUser')(db);
  const savingGoalController = require('../controllers/savingGoal.controller')(db);

  app.post('/api/users/:userId/spending-plan/saving-goal', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
    validateSavingGoalParams,
  ], savingGoalController.overwrite);

  app.put('/api/users/:userId/spending-plan/saving-goal', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
    validateSavingGoalParams,
  ], savingGoalController.overwrite);

  app.delete('/api/users/:userId/spending-plan/saving-goal', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
  ], savingGoalController.destroy);
};
