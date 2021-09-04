const User = require('../../models/user')

const getAllUserController = (req, res) => {
  return User.find({})
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ erros: [err.message] }))
}

module.exports = getAllUserController
