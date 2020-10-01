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
  username: 'test',
  email: 'test@example.com',
  password: 'passwordHash',
};

const testUserFiltered = {
  userId: testUser.userId,
  username: testUser.username,
  email: testUser.email,
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
  getAccessToken,
};
