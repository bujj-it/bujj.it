const { verifySessionToken } = require('../middleware/validateSession');
const processValidationErrors = require('../middleware/processValidationErrors');
const validateSpendingPlan = require('../middleware/validateSpendingPlan');

module.exports = (app, db) => {
  const validateUser = require('../middleware/validateUser')(db);
  const spendingPlanController = require('../controllers/spendingPlan.controller')(db);

  app.post(
    '/api/users/:userId/spending-plan', [
      verifySessionToken(db),
      validateUser.validateRequestedUserIdParam,
      validateUser.validateUserAuthorizedForResource,
      validateSpendingPlan,
      processValidationErrors,
    ], spendingPlanController.create,
  );
};
