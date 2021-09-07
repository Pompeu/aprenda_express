const mongoose = require('mongoose')
const fs = require('fs')
const password = fs.readFileSync('./.pass', 'utf-8')

const getUriByEnv = () => {
  if (process.env.NODE_ENV === 'testing') {
    return process.env.MONGO_URL
  }
  const uri = `mongodb+srv://javaria:${password.trim()}@cluster0.b9snm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  return uri
}

const connect = () => {
  return mongoose
    .connect(getUriByEnv(), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(console.error)
}

module.exports = connect
