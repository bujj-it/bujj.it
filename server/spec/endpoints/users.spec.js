require('spec/specHelper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('spec/dbSetup');
const app = require('app')(db);
const request = require('supertest')(app);

beforeEach(async () => {
  await db.dynamoDb.put({
    TableName: db.users,
    Item: {
      userId: '1',
      username: 'test',
      email: 'test@example.com',
      password: 'passwordHash',
    },
  }).promise();
});

afterEach(async () => {
  await db.dynamoDb.delete({
    TableName: db.users,
    Key: {
      userId: '1',
    },
  }).promise();
});

describe('users endpoint', () => {
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
