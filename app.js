const express = require("express");
const app = express();
const connectDb = require("./src/settings/connect");
const {
  createUserController,
  updateUserController,
  getUserController,
} = require("./src/controllers/users/index");

const createJwtController = require("./src/controllers/jwt/create_jwt");
const jwtCheck = require("./src/middleware/jwt_check");
connectDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.post("/api/user", createUserController);
app.put("/api/user/:id", jwtCheck, updateUserController);
app.get("/api/user/:id", getUserController);

app.post("/api/jwt", createJwtController);

app.listen(3000);
