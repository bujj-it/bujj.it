const debug = require('debug')('express:error:expensesController');
const uuid = require('uuid');

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const create = async (req, res) => {
    try {
      const newExpense = req.body;
      const newExpenseId = uuid.v1();
      const createExpenseParams = {
        TableName: userTable,
        Key: { userId: req.requestedUser.userId },
        UpdateExpression: 'SET #spendingPlan.#expenses.#newExpenseId = :newExpense',
        ExpressionAttributeNames: {
          '#spendingPlan': 'spendingPlan',
          '#expenses': 'expenses',
          '#newExpenseId': newExpenseId,
        },
        ExpressionAttributeValues: {
          ':newExpense': newExpense,
        },
      };
      await database.update(createExpenseParams).promise();
      const responseExpense = {};
      responseExpense[newExpenseId] = newExpense;
      res.status(200).send({
        message: 'New expense added.',
        expense: responseExpense,
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  return {
    create,
  };
};
