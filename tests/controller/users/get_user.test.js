const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../src/app");
const User = require("../../../src/models/user");

describe("Get user controller", () => {
  beforeAll(() => User.deleteMany({}));
  afterAll(() => {
    mongoose.connection.close();
  });

  describe("when send a id", () => {
    it("should be return an user", () => {
      return User.create({
        name: "jose_2",
        email: "jose@net.com",
        password: "122345",
      }).then((user) =>
        request(app)
          .get("/api/user/" + user.id)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body._id).toEqual(user.id);
          })
      );
    });
  });
});
