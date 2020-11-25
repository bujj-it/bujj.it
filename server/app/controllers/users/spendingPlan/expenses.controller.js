const debug = require('debug')('express:error:expensesController');
const uuid = require('uuid');

module.exports = (db) => {
  const { dbWrapper } = db;
  const database = db.dynamoDb;
  const userTable = db.users;

  const create = async (req, res) => {
    try {
      const newExpense = req.body;
      const newExpenseId = uuid.v1();
      await dbWrapper.updateExpense(req.requestedUser.userId, newExpenseId, newExpense);

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

  const update = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const createUpdateExpenseParams = {
        TableName: userTable,
        Key: { userId: req.requestedUser.userId },
        UpdateExpression: 'SET #spendingPlan.#expenses.#expenseId = :updatedExpense',
        ExpressionAttributeNames: {
          '#spendingPlan': 'spendingPlan',
          '#expenses': 'expenses',
          '#expenseId': expenseId,
        },
        ExpressionAttributeValues: {
          ':updatedExpense': req.body,
        },
      };
      await database.update(createUpdateExpenseParams).promise();
      const responseExpense = {};
      responseExpense[expenseId] = req.body;
      res.status(200).send({
        message: 'Expense updated.',
        expense: responseExpense,
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const { expenseId } = req.params;
      const createDestroyExpenseParams = {
        TableName: userTable,
        Key: { userId: req.requestedUser.userId },
        UpdateExpression: 'REMOVE #spendingPlan.#expenses.#expenseId',
        ExpressionAttributeNames: {
          '#spendingPlan': 'spendingPlan',
          '#expenses': 'expenses',
          '#expenseId': expenseId,
        },
      };
      await database.update(createDestroyExpenseParams).promise();
      res.status(200).send({
        message: 'Expense removed.',
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  return {
    create,
    update,
    destroy,
  };
};
