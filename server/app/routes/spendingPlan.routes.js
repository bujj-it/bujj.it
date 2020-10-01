const { verifySessionToken } = require('../middleware/authJwt');
const processValidationErrors = require('../middleware/processValidationErrors');
const validateSpendingPlan = require('../middleware/validateSpendingPlan');

module.exports = (app, db) => {
  const validateUser = require('../middleware/validateUser')(db);

  const spendingPlanController = require('../controllers/spendingPlan.controller')(
    db,
  );

  app.post(
    '/api/users/:userId/spending-plan', [
      verifySessionToken(db),
      validateUser.validateRequestedUserIdParam,
      validateSpendingPlan,
      processValidationErrors,
    ], spendingPlanController.create,
  );
};
