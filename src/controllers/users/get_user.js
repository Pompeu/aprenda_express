const User = require("../../models/user");

const getUserController = (req, res) => {
  return User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ erros: [err.message] }));
};

module.exports = getUserController;
