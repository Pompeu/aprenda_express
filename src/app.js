const express = require("express");
const app = express();
const connectDb = require("./settings/connect");
const {
  createUserController,
  updateUserController,
  getUserController,
  removeUserController,
  getAllUserController,
} = require("./controllers/users/index");

const createJwtController = require("./controllers/jwt/create_jwt");
const jwtCheck = require("./middleware/jwt_check");
connectDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.post("/api/user", createUserController);
app.put("/api/user/:id", jwtCheck, updateUserController);
app.get("/api/user/:id", getUserController);
app.get("/api/user", getAllUserController);
app.delete("/api/user/:id", removeUserController);

app.post("/api/jwt", createJwtController);

module.exports = app;
