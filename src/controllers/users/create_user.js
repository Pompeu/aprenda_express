const User = require('../../models/user')

const createUserController = (req, res) => {
  return User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json({ erros: [err.message] }))
}

module.exports = createUserController
