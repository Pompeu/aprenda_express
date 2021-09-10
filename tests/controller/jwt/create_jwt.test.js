const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../../../src/app')
const User = require('../../../src/models/user')

describe('Create jwt token controller', () => {
  beforeAll(() => User.deleteMany({}))
  afterAll(() => mongoose.connection.close())

  describe('when send an user', () => {
    it('should be return an token', (done) => {
      User.create({
        name: 'jose',
        email: 'jose@net.com',
        password: '555555'
      }).then((user) => {
        return request(app)
          .post('/api/jwt')
          .send({ email: user.email, password: user.password })
          .expect('Content-Type', /json/)
          .expect(201)
          .then((res) => {
            jwt.verify(res.body, 'secret', (err) => {
              expect(err).toBeNull()
              done()
            })
          })
      })
    })
  })

  describe('when send an invalid user', () => {
    it('should be return 401', () => {
      return request(app)
        .post('/api/jwt')
        .send({ email: 'ia@net.com', password: 'user' })
        .expect('Content-Type', /json/)
        .expect(401)
        .then((res) => expect(res.body).toEqual('falha ao logar'))
    })
  })
})
