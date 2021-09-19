const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../src/app')

describe('Check not found response', () => {
  afterAll(() => mongoose.connection.close())

  describe('when try get not exist end point', () => {
    it('should be return json with error 404', () => {
      return request(app)
        .get('/api/notfound')
        .expect('Content-Type', /json/)
        .expect(404)
    })
  })
})
