require("spec/specHelper");
const db = require("spec/dbSetup");
const app = require("app")(db);
const request = require("supertest")(app);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

beforeEach(async () => {
  await db.dynamoDb
    .put({
      TableName: db.users,
      Item: {
        userId: "1",
        username: "test",
        email: "test@example.com",
        password: "passwordHash",
      },
    })
    .promise();
});

afterEach(async () => {
  await db.dynamoDb
    .delete({
      TableName: db.users,
      Key: {
        userId: "1",
      },
    })
    .promise();
});

describe("sessions endpoint", () => {
  describe("POST /api/sessions", () => {
    test("unknown user", async () => {
      await request
        .post("/api/sessions")
        .send({
          user: "not a user",
          password: "password",
        })
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toBe("User not found");
        });
    });

    test("successful username login", async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, "compare")
        .mockImplementation(() => Promise.resolve(true));
      const jwtMock = jest
        .spyOn(jwt, "sign")
        .mockImplementation(() => "testJwtToken");
      await request
        .post("/api/sessions")
        .send({
          user: "test",
          password: "password",
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toBe("Login Successful");
          expect(
            response.header["set-cookie"].some((cookie) =>
              cookie.match(/x-access-token.+testJwtToken/i)
            )
          ).toBe(true);
          bcryptMock.mockRestore();
          jwtMock.mockRestore();
        });
    });

    test("successful email login", async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, "compare")
        .mockImplementation(() => Promise.resolve(true));
      const jwtMock = jest
        .spyOn(jwt, "sign")
        .mockImplementation(() => "testJwtToken");
      await request
        .post("/api/sessions")
        .send({
          user: "test@example.com",
          password: "password",
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toBe("Login Successful");
          expect(
            response.header["set-cookie"].some((cookie) =>
              cookie.match(/x-access-token.+testJwtToken/i)
            )
          ).toBe(true);
          bcryptMock.mockRestore();
          jwtMock.mockRestore();
        });
    });

    test("invalid password", async () => {
      const bcryptMock = jest
        .spyOn(bcrypt, "compare")
        .mockImplementation(() => Promise.resolve(false));
      const jwtMock = jest
        .spyOn(jwt, "sign")
        .mockImplementation(() => "testJwtToken");
      await request
        .post("/api/sessions")
        .send({
          user: "test@example.com",
          password: "password",
        })
        .then((response) => {
          expect(response.statusCode).toBe(401);
          expect(response.body.message).toBe("Password incorrect");
          bcryptMock.mockRestore();
          jwtMock.mockRestore();
        });
    });
  });
});
