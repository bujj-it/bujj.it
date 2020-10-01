const validateSession = require('../middleware/validateSession');
const validateSavingGoalParams = require('../middleware/validateSavingGoalParams');

module.exports = (app, db) => {
  const validateUser = require('../middleware/validateUser')(db);
  const verifySessionToken = validateSession.verifySessionToken(db);

  app.post('/api/users/:userId/spending-plan/saving-goal', [
    verifySessionToken,
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
    validateSavingGoalParams,
  ]);
};
