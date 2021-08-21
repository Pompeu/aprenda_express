const express = require("express");
const mongoose = require("mongoose");
const app = express();

const fs = require("fs");
const password = fs.readFileSync("./.pass", "utf-8");

const User = require("./src/models/user");
const uri = `mongodb+srv://javaria:${password.trim()}@cluster0.b9snm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch(console.error);

const createUserController = (req, res) => {
  return User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json({ erros: [err.message] }));
};

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/user", createUserController);

app.listen(3000);
