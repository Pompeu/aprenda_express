const User = require('../../models/user')

const updateUserController = (req, res) => {
  const query = { id: req.params.id }
  const updateData = { $set: req.body }
  const options = { new: true, fields: 'name' }

  return User.findOneAndUpdate(query, updateData, options)
    .then((user) => res.status(202).json(user))
    .catch((err) => res.status(500).json({ erros: [err.message] }))
}

module.exports = updateUserController
