const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../../../src/app')
const User = require('../../../src/models/user')

describe('Remove user controller', () => {
  beforeAll(() => User.deleteMany({}))

  afterAll(() => {
    mongoose.connection.close()
  })
  beforeEach(() => User.deleteMany({}))

  describe('when not send a jwt token', () => {
    it('should be return 401 status', () => {
      return User.create({
        name: 'jose_2',
        email: 'jose@net.com',
        password: '122345'
      }).then((user) =>
        request(app)
          .del('/api/user/' + user.id)
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
    it('should be return an 204 status', (done) => {
      const secret = 'secret'

      User.create({
        name: 'jose_2',
        email: 'jose@net.com',
        password: '122345'
      }).then((user) =>
        jwt.sign({ name: user.name, email: user.email }, secret, (err, token) =>
          request(app)
            .del('/api/user/' + user.id)
            .set('token', token)
            .expect('Content-Type', /json/)
            .expect(204)
            .then((res) => {
              expect(err).toBeNull()
              done()
            })
        )
      )
    })
  })
})
