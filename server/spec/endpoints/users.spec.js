require('spec/testEnv');

// require helpers
const {
  getAccessToken, testUser, testUserFiltered, testUser2,
} = require('spec/helpers/usersSpecHelper');

// require modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
}));

// setup test application
const setupTestApp = require('spec/specHelper');

const { request, db } = setupTestApp();

describe('users endpoint', () => {
  describe('ALL /api/users/:userId', () => {
    let accessToken;

    beforeEach(async () => {
      accessToken = await getAccessToken();
    });

    test('no login token', async () => {
      const response = await request.get(`/api/users/${testUser.userId}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });

    test('expired cookie', async () => {
      const sessionConfig = require('app/config/auth.config');
      const slidingTime = Date.now() + (sessionConfig.expiresIn + 1) * 1000;
      const timeMock = jest
        .spyOn(Date, 'now')
        .mockImplementation(() => slidingTime);
      const response = await request
        .get(`/api/users/${testUser.userId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized!');
      timeMock.mockRestore();
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
        .get(`/api/users/${testUser.userId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('User not found!');
    });

    test('user page invalid', async () => {
      const response = await request
        .get('/api/users/not-a-user-id')
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
        .get(`/api/users/${testUser2.userId}`)
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
  });

  describe('GET /api/users/:userId', () => {
    test('valid request', async () => {
      const accessToken = await getAccessToken();
      const response = await request
        .get(`/api/users/${testUser.userId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(200);
      expect(response.body.user).toMatchObject(testUserFiltered);
    });
  });

  describe('POST /api/users', () => {
    test('blank form', async () => {
      const response = await request.post('/api/users').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        username: 'Username cannot be blank!',
        email: 'Email cannot be blank!',
        password: 'Password cannot be blank!',
        passwordConfirmation: 'Password confirmation does not match password',
      });
    });

    test('blank username', async () => {
      const response = await request.post('/api/users').send({
        username: '',
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        username: 'Username cannot be blank!',
      });
    });

    test('invalid username', async () => {
      const response = await request.post('/api/users').send({
        username: '/',
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        username: 'Username can only be letters, numbers, and spaces!',
      });
    });

    test('invalid email', async () => {
      const response = await request.post('/api/users').send({
        username: 'test',
        email: 'not an email',
        password: 'password',
        passwordConfirmation: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        email: 'Please provide valid email!',
      });
    });

    test('invalid password', async () => {
      const response = await request.post('/api/users').send({
        username: 'test',
        email: 'test@example.com',
        password: '',
        passwordConfirmation: '',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        password: 'Password cannot be blank!',
      });
    });

    test('invalid password confirmation', async () => {
      const response = await request.post('/api/users').send({
        username: 'test',
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'not-password',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        passwordConfirmation: 'Password confirmation does not match password',
      });
    });

    test('duplicate username', async () => {
      const response = await request.post('/api/users').send({
        username: testUser.username,
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        username: 'Failed! Username is already in use!',
      });
    });

    test('duplicate email', async () => {
      const response = await request.post('/api/users').send({
        username: 'unique username',
        email: testUser.email,
        password: 'password',
        passwordConfirmation: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        email: 'Failed! Email is already in use!',
      });
    });

    test('successful signup', async () => {
      const uniqueId1 = 'uniqueUserId1';
      const mockUuidV1 = jest
        .spyOn(uuid, 'v1')
        .mockReturnValueOnce(uniqueId1);
      const bcryptMock = jest
        .spyOn(bcrypt, 'hashSync')
        .mockImplementation(() => Promise.resolve(true));
      const jwtMock = jest
        .spyOn(jwt, 'sign')
        .mockImplementation(() => 'testJwtToken');
      const response = await request.post('/api/users').send({
        username: 'unique username',
        email: 'unique@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User signup successful');
      expect(response.body.user).toMatchObject({
        userId: uniqueId1,
        username: 'unique username',
        email: 'unique@example.com',
      });
      expect(
        response.header['set-cookie'].some((cookie) => cookie.match(/x-access-token.+testJwtToken/i)),
      ).toBe(true);
      bcryptMock.mockRestore();
      jwtMock.mockRestore();
      mockUuidV1.mockRestore();
    });
  });
});
