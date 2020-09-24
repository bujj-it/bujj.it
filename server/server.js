const serverless = require('serverless-http');
const AWS = require('aws-sdk');

// setup db
const { USERS_TABLE } = process.env;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const db = { dynamoDb, users: USERS_TABLE };

// create app
const app = require('./app')(db);

// export to serverless
module.exports.handler = serverless(app);
