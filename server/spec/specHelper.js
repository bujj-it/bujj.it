require('spec/testEnv');

const setupTestApp = () => {
  // create app
  const db = require('spec/dbSetup');
  const app = require('app')(db);
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
    await db.dynamoDb
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
