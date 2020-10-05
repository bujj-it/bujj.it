// require helpers
const { getAccessToken, testUser } = require('spec/helpers/usersSpecHelper');
const uuid = require('uuid');

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
}));

// setup test application
const setupTestApp = require('spec/specHelper');

const { request, db } = setupTestApp();

describe('expenses endpoint', () => {
  const testUserExpenseId = Object.keys(testUser.spendingPlan.expenses)[0];
  let accessToken;

  beforeEach(async () => {
    accessToken = await getAccessToken();
  });

  describe('POST /api/users/:userId/spending-plan/expenses', () => {
    test('invalid expense key format', async () => {
      const testExpenses = { notName: 'rent', notValue: 500 };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send(testExpenses);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"name":"string","value":"number (currency)"}');
    });

    test('invalid expense value types', async () => {
      const testExpenses = { name: {}, notValue: '500' };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send(testExpenses);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"name":"string","value":"number (currency)"}');
    });

    test('successful expense creation', async () => {
      const uniqueId1 = 'uniqueId1';
      const mockUuidV1 = jest
        .spyOn(uuid, 'v1')
        .mockReturnValue(uniqueId1);
      const testExpense = { name: 'rent', value: 500 };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('New expense added.');
      expect(response.body.expense[uniqueId1]).toMatchObject(testExpense);
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.expenses[uniqueId1]).toMatchObject(testExpense);
      mockUuidV1.mockRestore();
    });
  });

  describe('PUT /api/users/:userId/spending-plan/expenses/:expenseId', () => {
    test('invalid expense key format', async () => {
      const testExpense = { notName: 'rent', notValue: 500 };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"name":"string","value":"number (currency)"}');
    });

    test('invalid expenseId', async () => {
      const testExpense = { name: 'rent', value: 500 };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/not-an-expense-id`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Expense ID not found.');
    });

    test('successful expense update', async () => {
      const testExpense = { name: 'new expense name', value: 512 };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Expense updated.');
      expect(response.body.expense[testUserExpenseId]).toMatchObject(testExpense);
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.expenses[testUserExpenseId]).toMatchObject(testExpense);
    });
  });

  describe('DELETE /api/users/:userId/spending-plan/expenses/:expenseId', () => {
    test('invalid expenseId', async () => {
      const response = await request
        .delete(`/api/users/${testUser.userId}/spending-plan/expenses/not-an-expense-id`)
        .set('cookie', accessToken);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Expense ID not found.');
    });

    test('valid request', async () => {
      const response = await request
        .delete(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Expense removed.');
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.expenses[testUserExpenseId]).toBeUndefined();
    });
  });
});
