require('spec/testEnv');

const setupTestApp = () => {
  // create app
  const db = require('spec/dbSetup');
  const { dbWrapper } = db;
  const app = require('app')(dbWrapper);
  const request = require('supertest')(app);

  const { testUser } = require('spec/helpers/usersSpecHelper');

  beforeEach(async () => {
    await db.dynamoDb
      .put({
        TableName: db.users,
        Item: testUser,
      })
      .promise();
  });

  afterEach(async () => {
    await db.dynamoDb.dynamoDb
      .delete({
        TableName: db.users,
        Key: {
          userId: testUser.userId,
        },
      })
      .promise();
  });

  return { request, db };
};

module.exports = setupTestApp;
