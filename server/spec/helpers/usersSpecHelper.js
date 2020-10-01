// setup environment
require('spec/specHelper');

// require modules
const bcrypt = require('bcryptjs');

// create app
const db = require('spec/dbSetup');
const app = require('app')(db);
const request = require('supertest')(app);

const testUser = {
  userId: '1',
  username: 'test username',
  email: 'test@example.com',
  password: 'passwordHash',
};

const testUserFiltered = {
  userId: testUser.userId,
  username: testUser.username,
  email: testUser.email,
};

const testUser2 = {
  userId: '2',
  username: 'test username 2',
  email: 'test2@example.com',
  password: 'passwordHash',
};

const getAccessToken = async () => {
  const bcryptMock = jest
    .spyOn(bcrypt, 'compare')
    .mockImplementation(() => Promise.resolve(true));
  const response = await request.post('/api/session').send({
    user: testUser.username,
    password: testUser.password,
  });
  const accessToken = response.header['set-cookie'].find((cookie) => cookie.match(/x-access-token/i));
  bcryptMock.mockRestore();
  return accessToken;
};

module.exports = {
  testUser,
  testUserFiltered,
  testUser2,
  getAccessToken,
};
