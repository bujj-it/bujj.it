module.exports = (app, db) => {
  const { verifySessionToken, validateUserAuthorizedForResource } = require('../middleware/validateUserAuthorization')(db);
  const validateRequestedUser = require('../middleware/validateRequestedUser')(db);
  const validateSpendingPlanParams = require('../middleware/validateSpendingPlanParams');
  const spendingPlanController = require('../controllers/spendingPlan.controller')(db);

  app.post(
    '/api/users/:userId/spending-plan', [
      verifySessionToken,
      validateRequestedUser,
      validateUserAuthorizedForResource,
      validateSpendingPlanParams,
    ], spendingPlanController.create,
  );
};
