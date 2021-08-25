const mongoose = require("mongoose");
const fs = require("fs");
const password = fs.readFileSync("./.pass", "utf-8");

const uri = `mongodb+srv://javaria:${password.trim()}@cluster0.b9snm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connect = () =>
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(console.error);

module.exports = connect;
