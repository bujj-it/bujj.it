const bcrypt = require("bcryptjs");

const databaseQueryResponse = {
  Items: [
    {
      username: "test",
      email: "test@example.com",
      password: "passwordHash",
      userId: "1",
    },
  ],
  Count: 1,
  ScannedCount: 1,
};

const database = require("spec/__mocks__/databaseMock")(databaseQueryResponse);
const app = require("app")(database);
const request = require("supertest")(app);

describe("/api/users", () => {
  describe("POST /api/users", () => {
    test("", async () => {
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
  });
});
