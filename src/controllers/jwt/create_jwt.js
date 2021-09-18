const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const secret = 'secret'

const createJwtController = (req, res) => {
  return User.comparePassword(req.body)
    .then((response) => {
      if (response.valid) {
        return jwt.sign(
          { name: response.user.name, email: response.user.email },
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
