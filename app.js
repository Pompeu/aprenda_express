const express = require("express");
const mongoose = require("mongoose");
const app = express();

const User = require("./src/models/user");
const uri = "mongodb://localhost:27017/aprenda_express";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const createUserController = (req, res) => {
  return User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json({ erros: [err.message] }));
};

app.post("/api/user", createUserController);

app.listen(3000);
