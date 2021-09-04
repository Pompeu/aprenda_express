const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const secret = 'secret'

const createJwtController = (req, res) => {
  return User.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password === req.body.password) {
        return jwt.sign(
          { name: user.name, email: user.email },
          secret,
          (err, token) => {
            if (!err) {
              res.status(201).json(token)
            }
            throw err
          }
        )
      }
      throw new Error('falha ao logar')
    })
    .catch((err) => res.status(401).json(err.message))
}

module.exports = createJwtController
