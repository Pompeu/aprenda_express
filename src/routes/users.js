const express = require('express')
const router = express.Router()

const {
  createUserController,
  updateUserController,
  getUserController,
  removeUserController,
  getAllUserController
} = require('../controllers/users/index')
const jwtCheck = require('../middleware/jwt_check')

router
  .post('/user', createUserController)
  .put('/user/:id', jwtCheck, updateUserController)
  .get('/user/:id', getUserController)
  .get('/user', getAllUserController)
  .delete('/user/:id', jwtCheck, removeUserController)

module.exports = router
