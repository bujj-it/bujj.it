require('spec/specHelper');

// require helpers
const { getAccessToken, testUser, testUser2 } = require('spec/helpers/usersSpecHelper');

// create app
const db = require('spec/dbSetup');
const app = require('app')(db);
const request = require('supertest')(app);

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

describe('savingGoal endpoint', () => {
  let accessToken;

  beforeEach(async () => {
    accessToken = await getAccessToken();
  });

  describe('POST /api/users/:userId/spending-plan/saving-goal', () => {
    test('no login token', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });

    test('deleted session user', async () => {
      await db.dynamoDb
        .delete({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        })
        .promise();
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('User not found!');
    });

    test('requested user invalid', async () => {
      const response = await request
        .post('/api/users/not-a-user-id/spending-plan/saving-goal')
        .set('cookie', accessToken);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User page not found!');
    });

    test('user unauthorized', async () => {
      await db.dynamoDb
        .put({
          TableName: db.users,
          Item: testUser2,
        }).promise();
      const response = await request
        .post(`/api/users/${testUser2.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('You have insufficient rights to view this page');
      await db.dynamoDb
        .delete({
          TableName: db.users,
          Key: {
            userId: testUser2.userId,
          },
        }).promise();
    });

    test('blank form', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toMatchObject({ name: 'name cannot be blank!', value: 'value cannot be blank!' });
    });

    test('invalid value types', async () => {
      const testSavingGoal = { name: {}, value: '500' };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(400);
      expect(response.body.message).toMatchObject({ name: 'name cannot be blank!', value: 'value cannot be blank!' });
    });

    test('additional parameters', async () => {
      const testSavingGoal = { name: {}, value: '500', additional: 'parameter' };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid saving goal format.');
    });
  });
});
