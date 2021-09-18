const express = require('express')
const router = express.Router()

const createJwtController = require('../controllers/jwt/create_jwt')

router.post('/jwt', createJwtController)

module.exports = router
