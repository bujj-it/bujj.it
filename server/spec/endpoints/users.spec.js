require('spec/specHelper')
const db = require('spec/dbSetup');
const app = require("app")(db);
const request = require("supertest")(app);

beforeAll(async () => {
  await db.dynamoDb.put({ 
    TableName: db.users,
    Item: {
      userId: '1',
      username: 'test',
      email: 'test@example.com',
      password: 'passwordHash'
    }
  }).promise();
})

afterAll(async () => {
  await db.dynamoDb.delete({ 
    TableName: db.users,
    Key: {
      userId: '1'
    }
  }).promise();
})

describe("users resource", () => {
  describe("POST /api/users", () => {
    test("duplicate username", async () => {
      await request
        .post("/api/users")
        .send({
          username: "test",
          email: "test@example.com",
          password: "password",
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe(
            "Failed! Username is already in use!"
          );
        });
    });

    test("duplicate email", async () => {
      await request
        .post("/api/users")
        .send({
          username: "unique username",
          email: "test@example.com",
          password: "password",
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe(
            "Failed! Email is already in use!"
          );
        });
    });
  });
});
