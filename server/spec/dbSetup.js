const dbWrapper = require('app/db/dbWrapper');
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const dynamoDb = new DocumentClient({
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: 'local',
  }),
});

const db = { dynamoDb, users: 'users-table-test', dbWrapper: dbWrapper(dynamoDb, 'users-table-test') };

module.exports = db;
