const { verifySessionToken } = require('../middleware/authJwt');

module.exports = (app, db) => {
  const spendingPlansController = require('../controllers/spendingPlans.controller')(
    db,
  );

  app.post(
    '/api/spending-plans',
    [verifySessionToken],
    spendingPlansController.create,
  );
};
