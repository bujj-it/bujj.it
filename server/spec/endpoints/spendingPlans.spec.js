// setup environment
require("spec/specHelper");

// require helpers
const { getAccessToken, testUser } = require("spec/helpers/usersHelper");
const uuid = require("uuid");
jest.mock("uuid", () => {
  return {
    v1: () => {
      return "uniqueId";
    },
  };
});

// create app
const db = require("spec/dbSetup");
const app = require("app")(db);
const request = require("supertest")(app);

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

describe("spendingPlans endpoint", () => {
  describe("POST /api/spending-plans", () => {
    let accessToken;

    beforeEach(async () => {
      accessToken = await getAccessToken();
    });

    test("no login token", async () => {
      const response = await request.post("/api/spending-plans");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("No token provided!");
    });

    test("successful spendingPlan creation - 1 expense", async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: "rent", value: 500 }],
        saving_percentage: 10,
      };
      const response = await request
        .post("/api/spending-plans")
        .set("cookie", accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("New Spending Plan created.");
      const checkSpendingPlanParams = {
        Key: { userId: testUser.userId },
        TableName: db.users,
      };
      const result = await db.dynamoDb.get(checkSpendingPlanParams).promise();
      const resultSpendingPlan = result.Item.spendingPlan;
      expect(resultSpendingPlan.income).toEqual(testSpendingPlan.income);
      expect(resultSpendingPlan.expenses.uniqueId).toEqual(
        testSpendingPlan.expenses[0]
      );
      expect(resultSpendingPlan.saving_percentage).toEqual(
        testSpendingPlan.saving_percentage
      );
    });
  });
});
