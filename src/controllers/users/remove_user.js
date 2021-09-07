const User = require('../../models/user')

const removeUserController = (req, res) => {
  return User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.set('Content-Type', 'application/json')
      return res.status(204).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ erros: [err.message] })
    })
}

module.exports = removeUserController
