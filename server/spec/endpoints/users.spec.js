// setup environment
require('spec/specHelper');

// require helpers
const { getAccessToken, testUser, testUserFiltered } = require('spec/helpers/usersHelper');

// require modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
}));

// require app
const db = require('spec/dbSetup');
const app = require('app');
const supertest = require('supertest');

let request;

beforeAll(() => {
  request = supertest(app(db));
});

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

describe('users endpoint', () => {
  describe('GET /api/users/:id', () => {
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

    test('deleted user', async () => {
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
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized!');
    });

    test('valid request', async () => {
      const response = await request
        .get(`/api/users/${testUser.userId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(200);
      expect(response.body.user).toMatchObject(testUserFiltered);
    });
  });

  describe('POST /api/users', () => {
    test('blank username', async () => {
      const response = await request.post('/api/users').send({
        username: '',
        email: 'test@example.com',
        password: 'password',
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
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        password: 'Password cannot be blank!',
      });
    });

    test('duplicate username', async () => {
      const response = await request.post('/api/users').send({
        username: 'test',
        email: 'test@example.com',
        password: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        username: 'Failed! Username is already in use!',
      });
    });

    test('duplicate email', async () => {
      const response = await request.post('/api/users').send({
        username: 'unique username',
        email: 'test@example.com',
        password: 'password',
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
