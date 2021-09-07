const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../../src/app')
const User = require('../../../src/models/user')

describe('Update a user controller', () => {
  beforeAll(() => User.deleteMany({}))
  afterAll(() => {
    mongoose.connection.close()
  })

  describe('when send a updated body with out toke', () => {
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
})
