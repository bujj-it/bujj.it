const validateRequestedExpenseId = (req, res, next) => {
  if (!Object.keys(req.requestedUser.spendingPlan.expenses)[0].includes(req.params.expenseId)) {
    return res.status(400).send({
      message: 'Expense ID not found.',
    });
  }
  return next();
};

module.exports = validateRequestedExpenseId;
