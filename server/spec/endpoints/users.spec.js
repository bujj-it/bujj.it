// setup environment
require('spec/specHelper');

// require modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// require app
const db = require('spec/dbSetup');
const app = require('app');
const supertest = require('supertest');

let request;

const testUser = {
  userId: '1',
  username: 'test',
  email: 'test@example.com',
  password: 'passwordHash',
};

beforeAll(() => {
  request = supertest(app(db));
});

beforeEach(async () => {
  await db.dynamoDb.put({
    TableName: db.users,
    Item: testUser,
  }).promise();
});

afterEach(async () => {
  await db.dynamoDb.delete({
    TableName: db.users,
    Key: {
      userId: testUser.userId,
    },
  }).promise();
});

describe('users endpoint', () => {
  describe('GET /api/users/:id', () => {
    let validAccessToken;

    beforeEach(async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      const response = await request
        .post('/api/sessions')
        .send({
          user: testUser.username,
          password: 'a strong password',
        });
      validAccessToken = response.header['set-cookie'].find((cookie) => cookie.match(/x-access-token/i));
      bcryptMock.mockRestore();
    });

    test('invalid login token', async () => {
      const response = await request
        .get(`/api/users/${testUser.userId}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });
  });

  describe('POST /api/users', () => {
    test('duplicate username', async () => {
      await request
        .post('/api/users')
        .send({
          username: 'test',
          email: 'test@example.com',
          password: 'password',
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe(
            'Failed! Username is already in use!',
          );
        });
    });

    test('duplicate email', async () => {
      await request
        .post('/api/users')
        .send({
          username: 'unique username',
          email: 'test@example.com',
          password: 'password',
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe(
            'Failed! Email is already in use!',
          );
        });
    });

    test('successful signup', async () => {
      const bcryptMock = jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => Promise.resolve(true));
      const jwtMock = jest.spyOn(jwt, 'sign').mockImplementation(() => 'testJwtToken');
      await request
        .post('/api/users')
        .send({
          username: 'unique username',
          email: 'unique@example.com',
          password: 'password',
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toBe(
            'User signup successful',
          );
          expect(response.header['set-cookie'].some((cookie) => cookie.match(/x-access-token.+testJwtToken/i))).toBe(true);
          bcryptMock.mockRestore();
          jwtMock.mockRestore();
        });
    });
  });
});
