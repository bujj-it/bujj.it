const debug = require('debug')('express:error:expensesController');
const uuid = require('uuid');

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const create = async (req, res) => res.status(200).send();

  return {
    create,
  };
};
