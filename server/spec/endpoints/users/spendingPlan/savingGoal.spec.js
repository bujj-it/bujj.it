require('spec/testEnv');

// require helpers
const { getAccessToken, testUser } = require('spec/helpers/usersSpecHelper');

// setup test application
const setupTestApp = require('spec/specHelper');

const { request, db } = setupTestApp();

describe('savingGoal endpoint', () => {
  let accessToken;

  beforeEach(async () => {
    accessToken = await getAccessToken();
  });

  describe('POST /api/users/:userId/spending-plan/saving-goal', () => {
    test('blank form', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid saving goal format.');
    });

    test('invalid value types', async () => {
      const testSavingGoal = { name: {}, value: 'not a number' };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(400);
      expect(response.body.message).toMatchObject({ name: 'name can only be letters, numbers, and spaces!', value: 'value format invalid, must be integer or decimal currency!' });
    });

    test('additional parameters', async () => {
      const testSavingGoal = { name: 'new saving goal', value: 500, additional: 'parameter' };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid saving goal format.');
    });

    test('valid request', async () => {
      const testSavingGoal = { name: 'new saving goal', value: 1500 };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('New saving goal added.');
      expect(response.body.savingGoal).toMatchObject(testSavingGoal);
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.savingGoal).toMatchObject(testSavingGoal);
    });
  });

  describe('PUT /api/users/:userId/spending-plan/saving-goal', () => {
    test('blank form', async () => {
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid saving goal format.');
    });

    test('invalid value types', async () => {
      const testSavingGoal = { name: {}, value: 'not a number' };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(400);
      expect(response.body.message).toMatchObject({ name: 'name can only be letters, numbers, and spaces!', value: 'value format invalid, must be integer or decimal currency!' });
    });

    test('additional parameters', async () => {
      const testSavingGoal = { name: 'new saving goal', value: 500, additional: 'parameter' };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid saving goal format.');
    });

    test('valid request', async () => {
      const testSavingGoal = { name: 'new saving goal', value: 1500 };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken)
        .send(testSavingGoal);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('New saving goal added.');
      expect(response.body.savingGoal).toMatchObject(testSavingGoal);
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.savingGoal).toMatchObject(testSavingGoal);
    });
  });

  describe('DELETE /api/users/:userId/spending-plan/saving-goal', () => {
    test('valid request', async () => {
      const response = await request
        .delete(`/api/users/${testUser.userId}/spending-plan/saving-goal`)
        .set('cookie', accessToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Saving goal removed.');
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.savingGoal).toBeUndefined();
    });
  });
});
