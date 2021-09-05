const request = require("supertest");

const app = require("../../../src/app");

describe("Get user controller", () => {
  describe("when send a id", () => {
    it("should be return an user", () => {
      const id = "612eb5e0b75e188280199745";

      return request(app)
        .get("/api/user/" + id)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toEqual(id);
        });
    });
  });
});
