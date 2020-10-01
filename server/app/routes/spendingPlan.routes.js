const { verifySessionToken } = require('../middleware/validateSession');
const validateSpendingPlanParams = require('../middleware/validateSpendingPlanParams');

module.exports = (app, db) => {
  const validateUser = require('../middleware/validateUser')(db);
  const spendingPlanController = require('../controllers/spendingPlan.controller')(db);

  app.post(
    '/api/users/:userId/spending-plan', [
      verifySessionToken(db),
      validateUser.validateRequestedUserIdParam,
      validateUser.validateUserAuthorizedForResource,
      validateSpendingPlanParams,
    ], spendingPlanController.create,
  );
};
