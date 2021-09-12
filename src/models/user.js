const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

UserSchema.pre('save', function (next) {
  return bcrypt
    .genSalt(10)
    .then((salt) =>
      bcrypt.hash(this.password, salt).then((hash) => {
        this.password = hash
        next()
      })
    )
    .catch(next)
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
