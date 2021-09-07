const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../src/app");
const User = require("../../../src/models/user");

describe("Create a user controller", () => {
  beforeAll(() => User.deleteMany({}));
  afterAll(() => {
    mongoose.connection.close();
  });

  describe("when send a body", () => {
    it("should be return an new user", () => {
      const user = {
        name: "Jose",
        email: "jose@net.com",
        password: "limp",
      };

      return request(app)
        .post("/api/user")
        .send(user)
        .expect("Content-Type", /json/)
        .expect(201)
        .then((res) => {
          expect(res.body.name).toEqual(user.name);
          expect(res.body.email).toEqual(user.email);
          expect(res.body.password).toEqual(user.password);
          expect(res.body._id).toBeDefined();
        });
    });
  });
});
