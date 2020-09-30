require('spec/specHelper');
const db = require('spec/dbSetup');
const app = require('app')(db);
const request = require('supertest')(app);

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const testUser = {
  userId: '1',
  username: 'test',
  email: 'test@example.com',
  password: 'passwordHash',
};

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

describe('session endpoint', () => {
  describe('POST /api/session', () => {
    test('blank user', async () => {
      const response = await request.post('/api/session').send({
        user: '',
        password: 'password',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual({ user: 'User field cannot be blank!' });
    });

    test('blank password', async () => {
      const response = await request.post('/api/session').send({
        user: 'test',
        password: '',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual({ password: 'Password field cannot be blank!' });
    });

    test('unknown user', async () => {
      const response = await request.post('/api/session').send({
        user: 'not a user',
        password: 'password',
      });
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('User not found');
    });

    test('successful username login', async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      const jwtMock = jest
        .spyOn(jwt, 'sign')
        .mockImplementation(() => 'testJwtToken');
      const response = await request.post('/api/session').send({
        user: 'test',
        password: 'password',
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Login Successful');
      expect(
        response.header['set-cookie'].some((cookie) => cookie.match(/x-access-token.+testJwtToken/i)),
      ).toBe(true);
      bcryptMock.mockRestore();
      jwtMock.mockRestore();
    });

    test('successful email login', async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      const jwtMock = jest
        .spyOn(jwt, 'sign')
        .mockImplementation(() => 'testJwtToken');
      const response = await request.post('/api/session').send({
        user: 'test@example.com',
        password: 'password',
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Login Successful');
      expect(
        response.header['set-cookie'].some((cookie) => cookie.match(/x-access-token.+testJwtToken/i)),
      ).toBe(true);
      bcryptMock.mockRestore();
      jwtMock.mockRestore();
    });

    test('invalid password', async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));
      const jwtMock = jest
        .spyOn(jwt, 'sign')
        .mockImplementation(() => 'testJwtToken');
      const response = await request.post('/api/session').send({
        user: 'test@example.com',
        password: 'password',
      });
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Password incorrect');
      bcryptMock.mockRestore();
      jwtMock.mockRestore();
    });
  });

  describe('DELETE /api/session', () => {
    let accessToken;

    beforeEach(async () => {
      // refactor this to helper function
      const bcryptMock = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      const response = await request.post('/api/session').send({
        user: testUser.username,
        password: 'a strong password',
      });
      accessToken = response.header['set-cookie'].find((cookie) => cookie.match(/x-access-token/i));
      bcryptMock.mockRestore();
    });

    test('logout', async () => {
      const response = await request
        .delete('/api/session')
        .set('cookie', accessToken);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('Logout successful');
      expect(response.header['set-cookie'][0]).toEqual(
        'x-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      );
    });
  });
});
