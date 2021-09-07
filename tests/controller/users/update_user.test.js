const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../../../src/app')
const User = require('../../../src/models/user')

describe('Update a user controller', () => {
  beforeAll(() => User.deleteMany({}))
  afterAll(() => {
    mongoose.connection.close()
  })

  beforeEach(() => User.deleteMany({}))

  describe('when send a updated body with out token', () => {
    it('should be return an jwt error', () => {
      const newUser = {
        name: 'jose_2',
        email: 'jose@net.com',
        password: '122345'
      }
      return User.create(newUser).then((user) =>
        request(app)
          .put('/api/user/' + user.id)
          .send(user)
          .expect('Content-Type', /json/)
          .expect(401)
          .then((res) => {
            expect(res.body.errors).toBeDefined()
            expect(res.body.errors[0]).toEqual('jwt must be provided')
          })
      )
    })
  })

  describe('when send a id and token', () => {
    it('should be return an 202 status', (done) => {
      const secret = 'secret'
      const updateUser = {
        name: 'maria'
      }

      User.create({
        name: 'jose_2',
        email: 'jose@net.com',
        password: '122345'
      }).then((user) =>
        jwt.sign({ name: user.name, email: user.email }, secret, (err, token) =>
          request(app)
            .put('/api/user/' + user.id)
            .send(updateUser)
            .set('token', token)
            .expect('Content-Type', /json/)
            .expect(202)
            .then((res) => {
              expect(err).toBeNull()
              expect(res.body.name).toEqual(updateUser.name)
              done()
            })
        )
      )
    })
  })
})
