const express = require('express')
const app = express()
const { usersRoute, jwtRoute } = require('./routes/index')
const connectDb = require('./settings/connect')
connectDb()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', usersRoute)
app.use('/api', jwtRoute)
app.use((_, res) => {
  return res.status(404).json('not found')
})

module.exports = app
