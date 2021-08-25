const express = require("express");
const app = express();
const connectDb = require("./src/settings/connect");
const {
  createUserController,
  getUserController,
} = require("./src/controllers/users/index");

connectDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.post("/api/user", createUserController);
app.get("/api/user/:id", getUserController);

app.listen(3000);
